import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { GitApiService } from './git-api.service'

@NgModule({
    declarations: [],
    imports: [CommonModule, HttpClientModule],
    providers: [GitApiService],
})
export class ApiModule {}
