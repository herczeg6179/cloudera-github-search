import { Component } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { GitApiService } from '../api/git-api.service'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    public isAuthenticated = false

    public loginForm = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
    })

    constructor(private gitApi: GitApiService) {}

    onSubmit() {
        if (this.loginForm.valid) {
            const { username, password } = this.loginForm.value
            this.gitApi.setAuthentication(username, password)
            this.gitApi.checkAuthentication().subscribe(
                // TODO notification handling
                () => (this.isAuthenticated = true),
                () => (this.isAuthenticated = false)
            )
        }
    }
}
