import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { ChartsComponent } from './components/charts/charts.component';
import { LoginComponent } from './components/login/login.component';
import { AddressFormComponent } from './components/address-form/address-form.component';

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
    path:'form', component: AddressFormComponent
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./components/dashboard/dashboard.module').then((m) => m.DashboardModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./components/users/users.module').then((m) => m.UserModule)
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
