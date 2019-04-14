import { NgModule } from '@angular/core'
import {
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatCardModule,
    MatListModule,
    MatBottomSheetModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
} from '@angular/material'

const materialModules = [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatCardModule,
    MatListModule,
    MatBottomSheetModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
]

@NgModule({
    declarations: [],
    imports: [...materialModules],
    exports: [...materialModules],
})
export class MaterialModule {}
