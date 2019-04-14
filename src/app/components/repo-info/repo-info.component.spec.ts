import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { RepoInfoComponent } from './repo-info.component'
import { NO_ERRORS_SCHEMA } from '@angular/core'

describe('RepoInfoComponent', () => {
    let component: RepoInfoComponent
    let fixture: ComponentFixture<RepoInfoComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RepoInfoComponent],
            schemas: [NO_ERRORS_SCHEMA], // only do shallow tests for now
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(RepoInfoComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
