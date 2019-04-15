import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing'

import { AuthenticationComponent } from './authentication.component'
import { MatBottomSheet } from '@angular/material'
import { of } from 'rxjs'
import { delay } from 'rxjs/operators'

const FAKE_ASYNC_TIME = 100

fdescribe('AuthenticationComponent', () => {
    let component: AuthenticationComponent
    let fixture: ComponentFixture<AuthenticationComponent>

    beforeEach(async(() => {
        const bottomSheetMock = {
            open: () => ({ afterDismissed: () => of(true).pipe(delay(FAKE_ASYNC_TIME)) }),
        }

        TestBed.configureTestingModule({
            providers: [{ provide: MatBottomSheet, useValue: bottomSheetMock }],
            declarations: [AuthenticationComponent],
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(AuthenticationComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should set isAuthenticated to provided value on login form dismiss', fakeAsync(() => {
        component.openLoginForm()
        expect(component.isAuthenticated).toEqual(false)
        tick(FAKE_ASYNC_TIME)
        expect(component.isAuthenticated).toEqual(true)
    }))
})
