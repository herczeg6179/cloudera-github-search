import { Component, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
import { map, tap } from 'rxjs/operators'

import { GitApiService } from '@api/git-api.service'
import { GitRepoInfo, GitIssueInfo } from '@api/git-api-interfaces'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
    private issueRequest: Subscription

    public repo: GitRepoInfo
    public issues: Array<GitIssueInfo>
    public reposToCompare: Array<GitRepoInfo> = []
    public issuesLoading: boolean

    constructor(private gitApi: GitApiService) {}

    ngOnDestroy() {
        this.cleanUpIssueRequest()
    }

    onAddForComparing(repo: GitRepoInfo): void {
        if (!this.reposToCompare.find(({ id }) => id === repo.id)) {
            this.reposToCompare = [...this.reposToCompare, repo]
        }
    }

    onRemoveFromComparing(repoID: GitRepoInfo['id']): void {
        this.reposToCompare = [...this.reposToCompare.filter(({ id }) => id !== repoID)]
    }

    onRepoSelected(repo: GitRepoInfo): void {
        this.repo = repo
        this.loadRepoIssues()
    }

    loadRepoIssues(): void {
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
