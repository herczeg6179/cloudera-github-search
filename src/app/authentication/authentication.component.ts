import { Component, OnInit, OnDestroy } from '@angular/core'
import { MatBottomSheet } from '@angular/material'
import { LoginComponent } from './login/login.component'
import { Subscription } from 'rxjs'

@Component({
    selector: 'app-authentication',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnDestroy {
    public isAuthenticated = false

    private loginFormSubscription: Subscription | null

    constructor(private bottomSheet: MatBottomSheet) {}

    ngOnDestroy() {
        this.destroyLoginFormSubscription()
    }

    openLoginForm() {
        this.destroyLoginFormSubscription()
        this.loginFormSubscription = this.bottomSheet
            .open(LoginComponent)
            .afterDismissed()
            .subscribe(isAuthenticated => {
                this.isAuthenticated = isAuthenticated
            })
    }

    private destroyLoginFormSubscription() {
        if (this.loginFormSubscription) {
            this.loginFormSubscription.unsubscribe()
            this.loginFormSubscription = null
        }
    }
}
