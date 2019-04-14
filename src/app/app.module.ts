import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component'
import {
    SearchToolComponent,
    RepoInfoComponent,
    AnalyticsComponent,
    RepoIssuesComponent,
    LoginComponent,
    RepoDetailsItemComponent,
    BarChartComponent,
    AuthenticationComponent,
} from './components'
import { MaterialModule, ApiModule } from './modules'

@NgModule({
    declarations: [
        AppComponent,
        SearchToolComponent,
        RepoInfoComponent,
        RepoIssuesComponent,
        AnalyticsComponent,
        LoginComponent,
        RepoDetailsItemComponent,
        BarChartComponent,
        AuthenticationComponent,
    ],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        ApiModule,
    ],
    entryComponents: [LoginComponent],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
