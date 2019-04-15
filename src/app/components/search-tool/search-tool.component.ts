import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms'
import { debounceTime, tap, switchMap, map, catchError } from 'rxjs/operators'
import { EMPTY, throwError } from 'rxjs'

import { GitRepoInfo } from '@api/git-api-interfaces'
import { GitApiService } from '@api/git-api.service'

const KEYDOWN_DEBOUNCE = 300
const RESULT_MAX_LENGTH = 10

@Component({
    selector: 'app-search-tool',
    templateUrl: './search-tool.component.html',
    styleUrls: ['./search-tool.component.scss'],
})
export class SearchToolComponent implements OnInit {
    @Output() repoSelected = new EventEmitter<GitRepoInfo>()

    public isLoading = false
    public repoList: Array<GitRepoInfo>
    public selectedRepo: GitRepoInfo

    public autocompleteForm = new FormGroup({ keyword: new FormControl('') })

    constructor(private gitApi: GitApiService) {}

    ngOnInit() {
        this.autocompleteForm
            .get('keyword')
            // the standard way the documentation suggest to handle api calls is this hot observable
            // but I suspect this could lead to memory leaks, I might change it later
            .valueChanges.pipe(debounceTime(KEYDOWN_DEBOUNCE))
            .pipe(tap(() => (this.isLoading = false))) // reset isLoading state
            // the way mat autocomplete works retriggers the change event on value select
            // I don't have a better idea to stop unnecessary API calls in those cases, than this fork
            .pipe(
                switchMap(keyword => (!!keyword && keyword !== this.selectedRepo ? this.searchKeyword(keyword) : EMPTY))
            )
            .subscribe(repoList => (this.repoList = repoList))
    }

    private searchKeyword(keyword) {
        this.isLoading = true
        return this.gitApi
            .getRepos(keyword)
            .pipe(map(result => result.items.splice(0, RESULT_MAX_LENGTH)))
            .pipe(tap(() => (this.isLoading = false)))
            .pipe(
                catchError(error => {
                    this.isLoading = false
                    return throwError(error)
                })
            )
    }

    formatOutput(repo: GitRepoInfo) {
        return repo ? repo.name : ''
    }

    setSetlected(repo: GitRepoInfo) {
        this.repoList = [] // need to get rid of this, to solve list popping issue on subsequent searches
        this.selectedRepo = repo
        this.repoSelected.emit(repo)
    }
}
