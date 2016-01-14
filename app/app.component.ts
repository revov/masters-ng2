import { Component, View } from 'angular2/core';
import { GithubBrowser } from './githubBrowser.component';

@Component({
    selector: 'main-app'
})
@View({
    template: `
    <div class="ui center aligned padded page grid">
        <div class="column">
            <h2 class="ui teal header">
                <div class="content">
                    Github браузър
                </div>
            </h2>
            <div class="ui large form">
                <div class="field">
                    <div class="ui left icon input">
                        <i class="github icon"></i>
                        <input type="text" name="repo" placeholder="Хранилище">
                    </div>
                </div>

                <div class="ui fluid large teal submit button">Намери</div>
            </div>

            <div class="ui divider"></div>

            <div class="container">
                <github-browser></github-browser>
            </div>
        </div>

    </div>
    `,
    directives: [GithubBrowser]
})
export class App {
    constructor() {
        
    }
}