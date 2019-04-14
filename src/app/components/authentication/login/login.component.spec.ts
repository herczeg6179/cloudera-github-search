import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { LoginComponent } from './login.component'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { GitApiService } from '@app/modules/api/git-api.service'
import { MatBottomSheetRef } from '@angular/material'

describe('LoginComponent', () => {
    let component: LoginComponent
    let fixture: ComponentFixture<LoginComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: GitApiService, useClass: class GitApiServiceStub {} },
                { provide: MatBottomSheetRef, useClass: class MatBottomSheetRefStub {} },
            ],
            imports: [HttpClientTestingModule],
            declarations: [LoginComponent],
            schemas: [NO_ERRORS_SCHEMA], // only do shallow tests for now
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
