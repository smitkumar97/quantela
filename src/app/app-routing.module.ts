import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ChartsComponent } from './charts/charts.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '', component: ProductsComponent            // default route
  },
  {
    path:'charts', component: ChartsComponent         // show Chart
  },
  {
    path:'login', component: LoginComponent           // login form
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then((m) => m.UserModule)
  },
  {
    path: '**',                                       // Wildcart route
    redirectTo: '',
    pathMatch: 'full',
    component: ProductsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
