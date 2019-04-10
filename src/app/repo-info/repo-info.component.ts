import { Component, OnInit, Input } from '@angular/core'
import { GitRepoInfo } from '../api/git-api-interfaces'

@Component({
    selector: 'app-repo-info',
    templateUrl: './repo-info.component.html',
    styleUrls: ['./repo-info.component.scss'],
})
export class RepoInfoComponent implements OnInit {
    @Input() repo: GitRepoInfo

    constructor() {}

    ngOnInit() {}
}
