import { TestBed, async } from '@angular/core/testing'
import { AppComponent } from './app.component'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { MatSnackBar } from '@angular/material'

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [{ provide: MatSnackBar, useClass: class MatSnackBarStub {} }],
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
})
