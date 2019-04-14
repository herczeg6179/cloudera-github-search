import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material'

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    constructor(private snackBar: MatSnackBar) {}

    notify(message) {
        this.snackBar.open(message, 'Dismiss', {
            duration: 5000,
        })
    }
}
