import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { RepoDetailsItemComponent } from './repo-details-item.component'
import { NO_ERRORS_SCHEMA } from '@angular/core'

describe('RepoDetailsItemComponent', () => {
    let component: RepoDetailsItemComponent
    let fixture: ComponentFixture<RepoDetailsItemComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RepoDetailsItemComponent],
            schemas: [NO_ERRORS_SCHEMA], // only do shallow tests for now
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(RepoDetailsItemComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
