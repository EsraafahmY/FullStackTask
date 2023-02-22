import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './Employee/employee.component';

const routes: Routes = [
  {
    component:EmployeeComponent,path:"employee"
  },
  {
    component:EmployeeComponent,path:""
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
