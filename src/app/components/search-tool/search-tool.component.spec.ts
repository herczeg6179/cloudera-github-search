import { async, ComponentFixture, TestBed, fakeAsync, tick, flushMicrotasks } from '@angular/core/testing'

import { SearchToolComponent } from './search-tool.component'
import { ReactiveFormsModule, FormsModule, AbstractControl } from '@angular/forms'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { MatAutocompleteModule, MatSnackBar } from '@angular/material'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { GitRepoInfo } from '@app/modules/api/git-api-interfaces'
import { of } from 'rxjs'
import { delay } from 'rxjs/operators'
import { GitApiService } from '@app/modules/api/git-api.service'

const FAKE_API_CALL_TIME = 100
const KEYDOWN_DEBOUNCE = 300

class GitApiServiceStub {
    getRepos() {
        return of({ items: [{ id: 1 } as GitRepoInfo] }).pipe(delay(FAKE_API_CALL_TIME))
    }
}
class GitApiServiceStubWithFiveRepos {
    getRepos() {
        return of({ items: new Array(5).fill(null).map((value, index) => ({ id: index + 1 } as GitRepoInfo)) }).pipe(
            delay(FAKE_API_CALL_TIME)
        )
    }
}
class GitApiServiceStubWithTwentyRepos {
    getRepos() {
        return of({ items: new Array(20).fill(null).map((value, index) => ({ id: index + 1 } as GitRepoInfo)) }).pipe(
            delay(FAKE_API_CALL_TIME)
        )
    }
}

const triggerSearchFactory = fixture => value => {
    const input = fixture.nativeElement.querySelector('.keyword-input')
    input.value = value
    input.dispatchEvent(new Event('input'))
    fixture.detectChanges()
}

describe('SearchToolComponent', () => {
    let component: SearchToolComponent
    let fixture: ComponentFixture<SearchToolComponent>

    const compileComponent = () => {
        TestBed.compileComponents()
        fixture = TestBed.createComponent(SearchToolComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: MatSnackBar, useClass: class MatSnackBarStub {} },
                { provide: GitApiService, useClass: GitApiServiceStub },
            ],
            imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule, MatAutocompleteModule],
            declarations: [SearchToolComponent],
            schemas: [NO_ERRORS_SCHEMA], // only do shallow tests for now
        })
    }))

    it('should create', () => {
        compileComponent()
        expect(component).toBeTruthy()
    })

    describe('ngOnInit()', () => {
        describe('keyowrd field value change', () => {
            let triggerSearch
            let gitApiSpy

            beforeEach(() => {
                gitApiSpy = jasmine.createSpyObj('gitApi', ['getRepos'])
                gitApiSpy.getRepos.and.returnValue(
                    of({ items: [{ id: 1 } as GitRepoInfo] }).pipe(delay(FAKE_API_CALL_TIME))
                )

                TestBed.configureTestingModule({
                    providers: [{ provide: GitApiService, useValue: gitApiSpy }],
                })

                compileComponent()

                triggerSearch = triggerSearchFactory(fixture)
            })

            it('should set the isLoading property before and after the load process', fakeAsync(() => {
                triggerSearch('something')
                tick(KEYDOWN_DEBOUNCE - 1)
                expect(component.isLoading).toEqual(false)
                tick(1)
                expect(component.isLoading).toEqual(true)
                tick(FAKE_API_CALL_TIME)
                expect(component.isLoading).toEqual(false)
            }))

            it('should not call getReposSpy if keyword is empty', fakeAsync(() => {
                triggerSearch('')
                tick(KEYDOWN_DEBOUNCE + FAKE_API_CALL_TIME)
                expect(gitApiSpy.getRepos).not.toHaveBeenCalled()
            }))

            // this currenlty fails, because I can't put an object into an input
            // god knows how angualr material does it...
            xit('should not call getReposSpy if keyword is equals the selected repo', fakeAsync(() => {
                component.selectedRepo = { id: 1 } as GitRepoInfo
                // mat autocomplete instits on putting the selected item in the fields value, hence the keyword is object thing
                triggerSearch({ id: 1 } as GitRepoInfo)
                tick(KEYDOWN_DEBOUNCE + FAKE_API_CALL_TIME)
                expect(gitApiSpy.getRepos).not.toHaveBeenCalled()
            }))

            it('should call the getReposSpy with the keyword, if not empty and not the selected repo', fakeAsync(() => {
                component.selectedRepo = { id: 1 } as GitRepoInfo
                triggerSearch('something')
                tick(KEYDOWN_DEBOUNCE + FAKE_API_CALL_TIME)
                expect(gitApiSpy.getRepos).toHaveBeenCalled()
            }))
        })

        describe('setting the repo list', () => {
            const setupWithApiServiceClass = apiServiceClass => {
                TestBed.configureTestingModule({
                    providers: [{ provide: GitApiService, useClass: apiServiceClass }],
                })

                compileComponent()
            }

            it(`should set the repo list to the api call's result's items property`, fakeAsync(() => {
                setupWithApiServiceClass(GitApiServiceStubWithFiveRepos)
                triggerSearchFactory(fixture)('something')
                tick(KEYDOWN_DEBOUNCE + FAKE_API_CALL_TIME)
                expect(component.repoList).toEqual([
                    { id: 1 } as GitRepoInfo,
                    { id: 2 } as GitRepoInfo,
                    { id: 3 } as GitRepoInfo,
                    { id: 4 } as GitRepoInfo,
                    { id: 5 } as GitRepoInfo,
                ])
            }))

            it(`should set the repo list to the api call's result's items property, 
                filtered to the maximum number of repos`, fakeAsync(() => {
                setupWithApiServiceClass(GitApiServiceStubWithTwentyRepos)
                triggerSearchFactory(fixture)('something')
                tick(KEYDOWN_DEBOUNCE + FAKE_API_CALL_TIME)
                expect(component.repoList).toEqual([
                    { id: 1 } as GitRepoInfo,
                    { id: 2 } as GitRepoInfo,
                    { id: 3 } as GitRepoInfo,
                    { id: 4 } as GitRepoInfo,
                    { id: 5 } as GitRepoInfo,
                    { id: 6 } as GitRepoInfo,
                    { id: 7 } as GitRepoInfo,
                    { id: 8 } as GitRepoInfo,
                    { id: 9 } as GitRepoInfo,
                    { id: 10 } as GitRepoInfo,
                ])
            }))
        })
    })

    describe('formatOutput()', () => {
        beforeEach(() => compileComponent())

        it('should return the name property of the repo parameter if the repo is truthy', () => {
            expect(component.formatOutput({} as GitRepoInfo)).toBeUndefined()
            expect(component.formatOutput({ name: null } as GitRepoInfo)).toEqual(null)
            expect(component.formatOutput({ name: 'repo-name' } as GitRepoInfo)).toEqual('repo-name')
        })

        it('should return empty string of the repo paramaeter is falsy', () => {
            expect(component.formatOutput(null as GitRepoInfo)).toEqual('')
        })
    })

    describe('setSelected()', () => {
        beforeEach(() => compileComponent())
        it('should reset the repoList to empty', () => {
            component.repoList = [{} as GitRepoInfo]
            component.setSetlected({ id: 1 } as GitRepoInfo)
            expect(component.repoList).toEqual([])
        })
        it('should reset the selectedRepo to the given repo', () => {
            component.selectedRepo = { id: 2 } as GitRepoInfo
            component.setSetlected({ id: 1 } as GitRepoInfo)
            expect(component.selectedRepo).toEqual({ id: 1 } as GitRepoInfo)
        })
    })
})
