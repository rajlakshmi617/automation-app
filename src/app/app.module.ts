import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { FieldvalidationComponent } from './fieldvalidation/fieldvalidation.component';
import {MatMenuModule,MatInputModule, MatButtonModule, MatSelectModule, MatIconModule, MatToolbarModule,
  MatTabsModule, MatButtonToggleModule, MatTreeModule, MatAutocompleteModule, MatExpansionModule,
  MatDialogModule, MatSnackBarModule } from '@angular/material';
import { SnackBarComponent } from '../app/shared/component/snack-bar-component';
import { ExcelgenerationComponent, DialogOverviewExampleDialog } from './excelgeneration/excelgeneration.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { from } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    FieldvalidationComponent,
    ExcelgenerationComponent,
    DialogOverviewExampleDialog,
    SnackBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatToolbarModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatTreeModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  entryComponents: [DialogOverviewExampleDialog, SnackBarComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
