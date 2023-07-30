import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { authRoutes } from './pages/auth/auth.routes';
import { InvestmentComponent } from './pages/investment/investment.component';

const routes: Routes = [
  {
    path:'auth',
    component:AuthComponent,
    children:authRoutes,    
  },
  { path:'',component:InvestmentComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
