import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { RepoDetailsItemComponent } from './repo-details-item.component'

describe('RepoDetailsItemComponent', () => {
    let component: RepoDetailsItemComponent
    let fixture: ComponentFixture<RepoDetailsItemComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RepoDetailsItemComponent],
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(RepoDetailsItemComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
