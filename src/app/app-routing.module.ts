import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ChartsComponent } from './charts/charts.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '', component: ProductsComponent
  },
  {
    path:'charts', component: ChartsComponent
  },
  {
    path:'login', component: LoginComponent
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then((m) => m.UserModule)
  },
  {
    path: '**', // Wildcart route
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
