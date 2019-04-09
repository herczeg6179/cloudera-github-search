import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component'
import { SearchToolComponent } from './search-tool/search-tool.component'
import { RepoInfoComponent } from './repo-info/repo-info.component'
import { RepoIssuesComponent } from './repo-issues/repo-issues.component'
import { AnalyticsComponent } from './analytics/analytics.component'
import { ApiModule } from './api/api.module'

@NgModule({
    declarations: [
        AppComponent,
        SearchToolComponent,
        RepoInfoComponent,
        RepoIssuesComponent,
        AnalyticsComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ApiModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
