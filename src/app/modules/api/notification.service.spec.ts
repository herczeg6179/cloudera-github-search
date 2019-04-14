import { TestBed } from '@angular/core/testing'

import { NotificationService } from './notification.service'
import { MatSnackBar } from '@angular/material'
import { NO_ERRORS_SCHEMA } from '@angular/core'

describe('NotificationService', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            providers: [{ provide: MatSnackBar, useValue: {} }],
            schemas: [NO_ERRORS_SCHEMA], // only do shallow tests for now
        })
    )

    it('should be created', () => {
        const service: NotificationService = TestBed.get(NotificationService)
        expect(service).toBeTruthy()
    })
})
