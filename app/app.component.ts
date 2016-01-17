import { Component, View } from 'angular2/core';
import { Navigator } from './navigator.component';

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

            <div class="container">
                <navigator></navigator>
            </div>
        </div>

    </div>
    `,
    directives: [Navigator]
})
export class App {
    constructor() {
        
    }
}