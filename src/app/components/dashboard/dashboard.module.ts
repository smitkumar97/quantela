import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { GridsterModule } from 'angular-gridster2';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    GridsterModule,
    MatIconModule,
    MatButtonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
