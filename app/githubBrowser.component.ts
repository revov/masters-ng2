import { Component, View } from 'angular2/core';
import {HTTP_PROVIDERS, Http, Headers, Request, RequestMethod} from 'angular2/http';
import AUTH_TOKEN from './authToken';

@Component({
    selector: 'github-browser',
    providers: [HTTP_PROVIDERS]
})
@View({
    template: `
    <table class="ui selectable celled striped table">
        <thead>
            <tr><th colspan="3">
                Git Repository
            </th>
        </tr></thead>
        <tbody>
            <tr *ngFor="#dir of dirs" (click)=makeRequest(dir.url)>
                <td class="collapsing">
                    <i class="folder icon"></i>{{dir.name}}
                </td>
            </tr>

            <tr *ngFor="#file of files" (click)=redirect(file.download_url)>
                <td class="collapsing">
                    <i class="file outline icon"></i>{{file.name}}
                </td>
            </tr>
        </tbody>
    </table>
`,
    styles: [`
        tbody tr {
            cursor: pointer; cursor: hand;
        }
    `]
})
export class GithubBrowser {
    files: Object[] = [];
    dirs: Object[] = [];

    constructor(private http: Http) {
        let url: string = 'https://api.github.com/repos/revov/cheatsheet-factory/contents';

        this.makeRequest(url);
    }
    
    private makeRequest(url: string) {
        let headers = new Headers();
        headers.append('Authorization', 'token ' + AUTH_TOKEN);

        let request = new Request({
            method: RequestMethod.Get,
            url: url,
            headers: headers
        });

        this.http.request(request).subscribe(res => {
            this.dirs.length = 0;
            this.files.length = 0;
            
            let items = res.json();
            items.forEach(item => {
                if(item.type == 'dir') {
                    this.dirs.push(item);
                } else if(item.type == 'file') {
                    this.files.push(item);
                }
            });
        });
    }
    
    private redirect(url: string) {
        window.location.href = url;
    }
}