import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, EMPTY, throwError } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { GitRepoList, GitIssueList } from './git-api-interfaces'

const API_URL = 'https://api.github.com/'

const API_ENDPONTS = {
    GET_REPOS: 'search/repositories',
    GET_ISSUES: 'search/issues',
}

@Injectable({
    providedIn: 'root',
})
export class GitApiService {
    protected _authToken: string

    get authToken() {
        return this._authToken
    }

    constructor(private http: HttpClient) {}

    private handleError(error: HttpErrorResponse) {
        // TODO
        console.error(error)
    }

    private request(apiCall) {
        return apiCall.pipe(
            catchError(error => {
                this.handleError(error)
                return EMPTY
            })
        )
    }

    private get(url: string, params: { [param: string]: string } = {}) {
        const headers: { [param: string]: string } = {}

        if (this.authToken) {
            headers.Authorization = `Basic ${this.authToken}`
        }

        return this.request(this.http.get(url, { params, headers }))
    }

    private generateAuthToken(username: string, password: string): string {
        return btoa(`${username}:${password}`)
    }

    getRepos(query: string): Observable<GitRepoList> {
        const params = { q: query }
        return this.get(`${API_URL}${API_ENDPONTS.GET_REPOS}`, params).pipe(map(response => response as GitRepoList))
    }

    getIssues(fullName: string): Observable<GitIssueList> {
        const params = { q: `repo:${fullName}` }
        return this.get(`${API_URL}${API_ENDPONTS.GET_ISSUES}`, params).pipe(map(response => response as GitIssueList))
    }

    // note: implementing Oauth is way out of scope, and storing base64 encoded auth credentials is insecure
    // so we fall back to this minimalistic way to authenticate
    setAuthentication(username: string, password: string): void {
        this._authToken = this.generateAuthToken(username, password)
    }

    checkAuthentication() {
        return !this.authToken ? throwError('Not Authenticated') : this.get(`${API_URL}`)
    }
}
