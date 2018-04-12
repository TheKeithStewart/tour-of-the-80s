import { NgModule } from '@angular/core';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
  MatIconModule,
  MatToolbarModule,
  MatCardModule,
  MatMenuModule,
  MatDialogModule,
  MatGridListModule,
  MatTableModule,
  MatSelectModule
} from '@angular/material';

@NgModule({
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatCardModule,
    MatMenuModule,
    MatGridListModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatSelectModule
  ]
})
export class MaterialModule { }