import { TestBed, async, fakeAsync, tick } from '@angular/core/testing'
import { AppComponent } from './app.component'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { MatSnackBar } from '@angular/material'
import { GitRepoInfo, GitIssueInfo } from './modules/api/git-api-interfaces'
import { GitApiService } from './modules/api/git-api.service'
import { of } from 'rxjs'
import { delay } from 'rxjs/operators'

const FAKE_API_CALL_TIME = 100

class GitApiServiceStub {
    getIssues() {
        return of({ items: [{ id: 1 } as GitIssueInfo] }).pipe(delay(FAKE_API_CALL_TIME))
    }
}

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: MatSnackBar, useClass: class MatSnackBarStub {} },
                { provide: GitApiService, useClass: GitApiServiceStub },
            ],
            imports: [HttpClientTestingModule],
            declarations: [AppComponent],
            schemas: [NO_ERRORS_SCHEMA], // only do shallow tests for now
        }).compileComponents()
    }))

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent)
        const app = fixture.debugElement.componentInstance
        expect(app).toBeTruthy()
    })

    describe('onAddForComparing()', () => {
        let component

        beforeEach(() => {
            component = TestBed.createComponent(AppComponent).componentInstance
            component.reposToCompare = [{ id: 1 } as GitRepoInfo, { id: 2 } as GitRepoInfo]
        })

        it('should push item into this.reposToCompare', () => {
            component.onAddForComparing({ id: 3 } as GitRepoInfo)

            expect(component.reposToCompare).toEqual([
                { id: 1 } as GitRepoInfo,
                { id: 2 } as GitRepoInfo,
                { id: 3 } as GitRepoInfo,
            ])
        })
        it('should not push item into this.reposToCompare if item is already in the list', () => {
            component.onAddForComparing({ id: 2 } as GitRepoInfo)

            expect(component.reposToCompare).toEqual([{ id: 1 } as GitRepoInfo, { id: 2 } as GitRepoInfo])
        })
    })

    describe('onRemoveFromComparing()', () => {
        let component

        beforeEach(() => {
            component = TestBed.createComponent(AppComponent).componentInstance
            component.reposToCompare = [{ id: 1 } as GitRepoInfo, { id: 2 } as GitRepoInfo]
        })

        it('should remove repo with given id from the this.reposToCompare list', () => {
            component.onRemoveFromComparing(2)
            expect(component.reposToCompare).toEqual([{ id: 1 } as GitRepoInfo])
        })

        it('should not change the this.reposToCompare list if given id is not found', () => {
            component.onRemoveFromComparing(4)
            expect(component.reposToCompare).toEqual([{ id: 1 } as GitRepoInfo, { id: 2 } as GitRepoInfo])
        })
    })

    describe('onRepoSelected()', () => {
        let component

        beforeEach(() => {
            component = TestBed.createComponent(AppComponent).componentInstance
            component.repo = { id: 1, name: 'repo-1' } as GitRepoInfo
        })

        it('should overwrite the repo property with the given value', () => {
            component.onRepoSelected({ id: 2 } as GitRepoInfo)

            expect(component.repo).toEqual({ id: 2 } as GitRepoInfo)
        })

        it('should set the issuesLoading property before and after the load process', fakeAsync(() => {
            component.onRepoSelected({ id: 2 } as GitRepoInfo)
            expect(component.issuesLoading).toEqual(true)
            tick(FAKE_API_CALL_TIME)
            expect(component.issuesLoading).toEqual(false)
        }))

        it('should set the issues list empty before the load process', fakeAsync(() => {
            component.issues = [{ id: 2 } as GitIssueInfo]
            component.onRepoSelected({ id: 2 } as GitRepoInfo)
            expect(component.issues).toEqual(null)
            tick(FAKE_API_CALL_TIME)
        }))

        it('should set the issues list after the load process', fakeAsync(() => {
            component.issues = [{ id: 2 } as GitIssueInfo]
            component.onRepoSelected({ id: 2 } as GitRepoInfo)
            tick(FAKE_API_CALL_TIME)
            expect(component.issues).toEqual([{ id: 1 } as GitIssueInfo])
        }))
    })
})
