import { Component, View } from 'angular2/core';
import { Control } from 'angular2/common';
import { GithubBrowser } from './githubBrowser.component';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';

@Component({
    selector: 'navigator'
})
@View({
    template: `
    <div class="ui breadcrumb">
        <div class="ui left icon input section">
            <input placeholder="GitHub Repo" type="text" [ngFormControl]="repoControl" (focus)="onInputFocus()">
            <i class="github icon"></i>
        </div>
        <span *ngFor="#breadcrumb of breadcrumbs; #isLast = last; #i=index">
            <div class="divider"> / </div>
            <a class="section" [ngClass]="{active: isLast}" (click)="changeDir(i)">{{breadcrumb}}</a>
        </span>
    </div>
    <div class="ui divider"></div>
    <github-browser [path]="getPath()" (directoryChanged)="onDirectoryChanged($event)"></github-browser>
`,
    directives: [GithubBrowser]
})
export class Navigator {
    repoControl: Control = new Control();
    repo: string = '';
    breadcrumbs: string[] = [];

    constructor() {
        let repoChanges:Observable<string> = Observable.create(o => {
            this.repoControl.valueChanges
                .subscribe(value => o.next(value));
        });

        repoChanges
            .debounceTime(1500)
            .subscribe(value => {
                this.breadcrumbs = [];
                this.repo = value;
            });
    }

    private onDirectoryChanged(folder: string) {
        this.breadcrumbs.push(folder);
    }
    
    private onInputFocus() {
        this.breadcrumbs = [];
    }

    private getPath() {
        if(this.repo == '') {
            return '';
        } else {
            return this.repo + '/contents/' + this.breadcrumbs.join('/');
        }
    }
    
    private changeDir(index: number) {
        this.breadcrumbs = this.breadcrumbs.slice(0, index + 1);
    }
}