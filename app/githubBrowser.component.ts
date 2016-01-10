import { Component, View } from 'angular2/core';

@Component({
    selector: 'github-browser'
})
@View({
    template: `
    <table class="ui celled striped table">
        <thead>
            <tr><th colspan="3">
                Git Repository
            </th>
        </tr></thead>
        <tbody>
            <tr>
                <td class="collapsing">
                    <i class="folder icon"></i> node_modules
                </td>
                <td>Initial commit</td>
                <td class="right aligned collapsing">10 hours ago</td>
            </tr>
            
            <tr>
                <td>
                    <i class="file outline icon"></i> package.json
                </td>
                <td>Initial commit</td>
                <td class="right aligned">10 hours ago</td>
            </tr>
        </tbody>
    </table>
`
})
export class GithubBrowser {

}