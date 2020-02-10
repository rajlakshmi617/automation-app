import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgJsonEditorModule } from 'ang-jsoneditor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { FieldvalidationComponent } from './fieldvalidation/fieldvalidation.component';
import {MatMenuModule,MatInputModule, MatButtonModule, MatSelectModule, MatIconModule, MatToolbarModule,
  MatTabsModule, MatButtonToggleModule, MatTreeModule, MatAutocompleteModule, MatExpansionModule,
  MatDialogModule, MatSlideToggleModule } from '@angular/material';
import { ExcelgenerationComponent, DialogOverviewExampleDialog } from './excelgeneration/excelgeneration.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FieldvalidationComponent,
    ExcelgenerationComponent,
    DialogOverviewExampleDialog,
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
    MatSlideToggleModule
  ],
  entryComponents: [DialogOverviewExampleDialog],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
