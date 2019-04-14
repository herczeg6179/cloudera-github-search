import { Component, Input, OnChanges } from '@angular/core'
import { GitIssueInfo } from '@api/git-api-interfaces'

interface IssuesOfState {
    state: string
    issues: Array<GitIssueInfo>
}

@Component({
    selector: 'app-repo-issues',
    templateUrl: './repo-issues.component.html',
    styleUrls: ['./repo-issues.component.scss'],
})
export class RepoIssuesComponent implements OnChanges {
    @Input() issues: Array<GitIssueInfo>
    @Input() isLoading: boolean

    public issuesByState: Array<IssuesOfState>

    constructor() {}

    ngOnChanges() {
        this.setIssuesByState()
    }

    private setIssuesByState() {
        if (this.issues) {
            const emptyIssuesByState = this.getEmptyIssuesByStateList()
            this.issuesByState = emptyIssuesByState.map(issuesOfState => {
                issuesOfState.issues = this.issues.filter(issue => issue.state === issuesOfState.state)
                return issuesOfState
            })
        } else {
            this.issuesByState = []
        }
    }

    private getEmptyIssuesByStateList(): Array<IssuesOfState> {
        return this.issues
            .reduce(
                (allStates, issue) =>
                    allStates.indexOf(issue.state) !== -1 ? allStates : allStates.concat(issue.state),
                []
            )
            .map(state => ({ state, issues: [] }))
    }
}
