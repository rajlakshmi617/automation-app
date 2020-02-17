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
  MatDialogModule, MatSnackBarModule, MatSlideToggleModule, MatCheckboxModule } from '@angular/material';
import { SnackBarComponent } from './shared/component/snack-bar/snack-bar.component';
import { DialogOverviewExampleDialog } from './shared/component/mat-dialoge/dialoge-overview-example-dialoge.component';
import { ExcelgenerationComponent } from './containers/excelgeneration/excelgeneration.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { fileSystemReducer } from './store/reducers/fileSystem.reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import {EffectsModule} from '@ngrx/effects';
import {FileSystemEffects} from '../app/store/effects/fileSystem.effects';

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
    EffectsModule,
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
    MatSlideToggleModule,
    MatCheckboxModule,
    EffectsModule.forRoot([FileSystemEffects]),
    StoreModule.forRoot({
      fileSystem : fileSystemReducer
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  entryComponents: [DialogOverviewExampleDialog, SnackBarComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
