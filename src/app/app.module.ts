import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatCardModule,
    MatListModule,
} from '@angular/material'

import { AppComponent } from './app.component'
import { SearchToolComponent } from './search-tool/search-tool.component'
import { RepoInfoComponent } from './repo-info/repo-info.component'
import { RepoIssuesComponent } from './repo-issues/repo-issues.component'
import { AnalyticsComponent } from './analytics/analytics.component'
import { ApiModule } from './api/api.module'
import { LoginComponent } from './login/login.component'
import { RepoDetailsItemComponent } from './repo-info/repo-details-item/repo-details-item.component'

@NgModule({
    declarations: [
        AppComponent,
        SearchToolComponent,
        RepoInfoComponent,
        RepoIssuesComponent,
        AnalyticsComponent,
        LoginComponent,
        RepoDetailsItemComponent,
    ],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        MatCardModule,
        MatListModule,
        ApiModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
