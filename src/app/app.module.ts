import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgJsonEditorModule } from 'ang-jsoneditor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { FieldvalidationComponent } from './containers/fieldvalidation/fieldvalidation.component';
import {MatMenuModule,MatInputModule, MatButtonModule, MatSelectModule, MatIconModule, MatToolbarModule,
  MatTabsModule, MatButtonToggleModule, MatTreeModule, MatAutocompleteModule, MatExpansionModule,
  MatDialogModule, MatSnackBarModule, MatSlideToggleModule } from '@angular/material';
import { SnackBarComponent } from './shared/component/snack-bar/snack-bar.component';
import { DialogOverviewExampleDialog } from './shared/component/mat-dialoge/dialoge-overview-example-dialoge.component';
import { ExcelgenerationComponent } from './containers/excelgeneration/excelgeneration.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

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
    NgJsonEditorModule,
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
    MatSnackBarModule,
    MatSlideToggleModule
  ],
  entryComponents: [DialogOverviewExampleDialog, SnackBarComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
