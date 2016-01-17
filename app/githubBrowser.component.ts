import { Component, View, Input, Output, EventEmitter, OnChanges, SimpleChange } from 'angular2/core';
import {HTTP_PROVIDERS, Http, Headers, Request, RequestMethod} from 'angular2/http';
import AUTH_TOKEN from './authToken';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'github-browser',
    providers: [HTTP_PROVIDERS]
})
@View({
    template: `
    <div class="ui negative message" [hidden]="errorMessage == ''">
        <i class="close icon" (click)="errorMessage=''"></i>
        <p>
            {{errorMessage}}
        </p>
    </div>
    <table class="ui selectable celled striped table">
        <thead>
            <tr><th colspan="3">
                Git Repository
            </th>
        </tr></thead>
        <tbody>
            <tr *ngFor="#dir of dirs" (click)="changeDirectory(dir.name);">
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
export class GithubBrowser implements OnChanges{
    files: Object[] = [];
    dirs: Object[] = [];
    errorMessage: string = '';
    
    @Output() directoryChanged = new EventEmitter<string>();
    @Input() path: string;

    constructor(private http: Http) {
        
    }

    private makeRequest() {
        let url: string = 'https://api.github.com/repos/' + this.path;
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
            
            let items : Object[] = res.json();

            items.forEach(item => {
                if(item.type == 'dir') {
                    this.dirs.push(item);
                } else if(item.type == 'file') {
                    this.files.push(item);
                }
            });

            this.errorMessage = '';
        }, error => this.errorMessage = error.json().message);
    }
    
    private changeDirectory(folder:string) {
        this.directoryChanged.emit(folder);
    }
    
    private redirect(url: string) {
        window.location.href = url;
    }
    
    ngOnChanges(changes: {[propName: string]: SimpleChange}) {
        if(changes.path && changes.path.currentValue != '') {
            this.makeRequest();
        }
    }
}