import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FieldvalidationComponent } from './containers/fieldvalidation/fieldvalidation.component';
import { ExcelgenerationComponent } from './containers/excelgeneration/excelgeneration.component';


const routes: Routes = [
  { path: 'validation', component: FieldvalidationComponent },
  { path: '', component: ExcelgenerationComponent},
  { path: 'excel-generation', component: ExcelgenerationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
