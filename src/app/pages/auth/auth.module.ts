import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { authRoutes } from './auth.routes';
import { AuthComponent } from './auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RecoverComponent } from './recover/recover.component';



@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    RecoverComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(authRoutes),
    ReactiveFormsModule,
  ]
})
export class AuthModule { }
