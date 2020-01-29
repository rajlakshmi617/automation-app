import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FieldvalidationComponent } from './fieldvalidation/fieldvalidation.component';
import {MatMenuModule,MatInputModule, MatButtonModule, MatSelectModule, MatIconModule, MatToolbarModule,
  MatTabsModule, MatButtonToggleModule, MatTreeModule, MatAutocompleteModule} from '@angular/material';
import { ExcelgenerationComponent } from './excelgeneration/excelgeneration.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FieldvalidationComponent,
    ExcelgenerationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
    MatAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
