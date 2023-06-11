import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees/pages/employees/employees.component';
import { HomeEmployeeComponent } from './home/pages/home-employee/home-employee.component';
import { HomeComponent } from './home/pages/home/home.component';

import { LoginComponent } from './login/pages/login/login.component';
import { PaymentComponent } from './payment/pages/payment/payment.component';
import { ProfileEmployeeUserComponent } from './profile/pages/profile-employee-user/profile-employee-user.component';
import { ProfileClientComponent } from './profile/pages/profile-client/profile-client.component';
import { ProfileEmployeeComponent } from './profile/pages/profile-employee/profile-employee.component';
import { ProfileComponent } from './profile/pages/profile/profile.component';
import { RegisterComponent } from './register/pages/register/register.component';
import { ServicesComponent } from './services/pages/services/services.component';
import { ConfigureregisterComponent } from './register/pages/configureregister/configureregister.component';
import { RequestComponent } from './request/pages/request/request.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login',component:LoginComponent},
  { path: 'register',component:RegisterComponent},
  { path: 'configure',component:ConfigureregisterComponent},
  { path: 'home',component:HomeComponent},
  { path: 'profile',component:ProfileComponent},
  { path: 'services',component:ServicesComponent},
  { path: 'employees/:id',component:EmployeesComponent},
  { path: 'employees/information/:id',component:ProfileEmployeeComponent},
  { path: 'client/information/:id',component:ProfileClientComponent},
  { path: 'payment/:id',component:PaymentComponent},
  { path: 'profileemployee',component:ProfileEmployeeUserComponent},
  { path: 'homeemployee',component:HomeEmployeeComponent},
  { path: 'request',component:RequestComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
