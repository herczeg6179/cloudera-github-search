import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { RepoIssuesComponent } from './repo-issues.component'
import { NO_ERRORS_SCHEMA } from '@angular/core'

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
})
