import { Component, Input, Output, EventEmitter } from '@angular/core'
import { GitRepoInfo } from '@api/git-api-interfaces'

@Component({
    selector: 'app-repo-info',
    templateUrl: './repo-info.component.html',
    styleUrls: ['./repo-info.component.scss'],
})
export class RepoInfoComponent {
    @Input() repo: GitRepoInfo

    @Output() addForComparing = new EventEmitter<GitRepoInfo>()

    constructor() {}

    selectForComparing() {
        this.addForComparing.emit({ ...this.repo })
    }
}
