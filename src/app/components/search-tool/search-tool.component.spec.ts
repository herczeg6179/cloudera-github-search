import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { SearchToolComponent } from './search-tool.component'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { MatAutocompleteModule, MatSnackBar } from '@angular/material'
import { HttpClientTestingModule } from '@angular/common/http/testing'

describe('SearchToolComponent', () => {
    let component: SearchToolComponent
    let fixture: ComponentFixture<SearchToolComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [{ provide: MatSnackBar, useClass: class MatSnackBarStub {} }],
            imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule, MatAutocompleteModule],
            declarations: [SearchToolComponent],
            schemas: [NO_ERRORS_SCHEMA], // only do shallow tests for now
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchToolComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
