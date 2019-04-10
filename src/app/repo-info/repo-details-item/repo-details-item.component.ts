import { Component, Input } from '@angular/core'

@Component({
    selector: 'app-repo-details-item',
    templateUrl: './repo-details-item.component.html',
    styleUrls: ['./repo-details-item.component.scss'],
})
export class RepoDetailsItemComponent {
    @Input() label: string

    constructor() {}
}
