import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FieldvalidationComponent } from '../app/fieldvalidation/fieldvalidation.component';


const routes: Routes = [{ path: 'field', component: FieldvalidationComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
