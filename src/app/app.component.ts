import { Component, OnInit } from '@angular/core'
import { GitApiService } from './api/git-api.service'
import { GitRepoInfo, GitIssueInfo } from './api/git-api-interfaces'
import { Subscription } from 'rxjs'
import { map, tap } from 'rxjs/operators'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    public repo: GitRepoInfo
    public issues: Array<GitIssueInfo>
    public issuesLoading: boolean
    private issueRequest: Subscription

    constructor(private gitApi: GitApiService) {}

    ngOnInit() {}

    onRepoSelected(repo) {
        this.repo = repo
        this.loadRepoIssues()
    }

    loadRepoIssues() {
        this.destroyIssueData()
        this.issuesLoading = true
        this.issueRequest = this.gitApi
            .getIssues(this.repo.full_name)
            .pipe(tap(() => (this.issuesLoading = false)))
            .pipe(map(result => result.items))
            .subscribe({
                next: issues => (this.issues = issues),
                // these are just to consistently unset issueRequest subscriptions when there isn't an ongoing request
                // makes canceling in progress request in favor of a new one easier
                complete: () => this.cleanUpIssueRequest(),
                error: () => this.cleanUpIssueRequest(),
            })
    }

    private cleanUpIssueRequest() {
        if (this.issueRequest) {
            this.issueRequest.unsubscribe()
            this.issueRequest = null
        }
    }

    private destroyIssueData() {
        this.issues = null
        this.cleanUpIssueRequest()
    }
}
