import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { GitApiService } from './git-api.service'
import { NotificationService } from './notification.service'

@NgModule({
    declarations: [],
    imports: [CommonModule, HttpClientModule],
    providers: [GitApiService, NotificationService],
})
export class ApiModule {}
