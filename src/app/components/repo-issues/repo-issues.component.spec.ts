import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { RepoIssuesComponent } from './repo-issues.component'

describe('RepoIssuesComponent', () => {
    let component: RepoIssuesComponent
    let fixture: ComponentFixture<RepoIssuesComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RepoIssuesComponent],
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
