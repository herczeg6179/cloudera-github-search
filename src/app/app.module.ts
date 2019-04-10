import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material'

import { AppComponent } from './app.component'
import { SearchToolComponent } from './search-tool/search-tool.component'
import { RepoInfoComponent } from './repo-info/repo-info.component'
import { RepoIssuesComponent } from './repo-issues/repo-issues.component'
import { AnalyticsComponent } from './analytics/analytics.component'
import { ApiModule } from './api/api.module'
import { LoginComponent } from './login/login.component'

@NgModule({
    declarations: [
        AppComponent,
        SearchToolComponent,
        RepoInfoComponent,
        RepoIssuesComponent,
        AnalyticsComponent,
        LoginComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        ApiModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
