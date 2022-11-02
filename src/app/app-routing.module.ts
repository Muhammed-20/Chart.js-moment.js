import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClinicComponent } from './clinic/clinic.component';

const routes: Routes = [
  {path:'clinics',component:ClinicComponent},
  {path:'',redirectTo:'/clinics',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
