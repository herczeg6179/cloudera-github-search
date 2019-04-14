import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { AnalyticsComponent } from './analytics.component'
import { NO_ERRORS_SCHEMA } from '@angular/core'

describe('AnalyticsComponent', () => {
    let component: AnalyticsComponent
    let fixture: ComponentFixture<AnalyticsComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AnalyticsComponent],
            schemas: [NO_ERRORS_SCHEMA], // only do shallow tests for now
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(AnalyticsComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
