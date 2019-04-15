import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { RepoIssuesComponent } from './repo-issues.component'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { GitIssueInfo } from '@app/modules/api/git-api-interfaces'

describe('RepoIssuesComponent', () => {
    let component: RepoIssuesComponent
    let fixture: ComponentFixture<RepoIssuesComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RepoIssuesComponent],
            schemas: [NO_ERRORS_SCHEMA], // only do shallow tests for now
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(RepoIssuesComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should set the issuesByState list empty if issues input is empty', () => {
        component.issues = null
        component.ngOnChanges()
        fixture.detectChanges()
        expect(component.issuesByState).toEqual([])
    })

    it('should set the issuesByState list if issues input is not empty', () => {
        const issueStub1 = { id: 1, state: 'open' } as GitIssueInfo
        const issueStub2 = { id: 2, state: 'open' } as GitIssueInfo
        const issueStub3 = { id: 3, state: 'closed' } as GitIssueInfo

        component.issues = [issueStub1, issueStub2, issueStub3]
        component.ngOnChanges()
        fixture.detectChanges()

        expect(component.issuesByState).toEqual([
            {
                state: 'open',
                issues: [issueStub1, issueStub2],
            },
            {
                state: 'closed',
                issues: [issueStub3],
            },
        ])
    })
})
