import { Component, Output, EventEmitter, OnDestroy } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MatBottomSheetRef } from '@angular/material'
import { Subscription } from 'rxjs'

import { GitApiService } from '@api/git-api.service'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
    @Output() loginStateChange = new EventEmitter<boolean>()

    public loginForm = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
    })

    private apiCallSubscription: Subscription | null

    constructor(private gitApi: GitApiService, private bottomSheetRef: MatBottomSheetRef<LoginComponent>) {}

    ngOnDestroy() {
        this.destroyApiCallSubscription()
    }

    onSubmit() {
        if (this.loginForm.valid) {
            this.destroyApiCallSubscription()
            const { username, password } = this.loginForm.value
            this.gitApi.setAuthentication(username, password)
            this.gitApi.checkAuthentication().subscribe(() => this.bottomSheetRef.dismiss(true))
        }
    }

    private destroyApiCallSubscription() {
        if (this.apiCallSubscription) {
            this.apiCallSubscription.unsubscribe()
            this.apiCallSubscription = null
        }
    }
}
