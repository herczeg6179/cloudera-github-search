import { Component, OnInit } from '@angular/core'
import { GitApiService } from './api/git-api.service'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    constructor(private gitApiService: GitApiService) {}

    ngOnInit() {}
}
