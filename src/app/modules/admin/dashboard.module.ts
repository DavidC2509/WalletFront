import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { adminRoutes } from './admin.routing';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    RouterModule.forChild(adminRoutes),
    CommonModule,
    SharedModule
  ]
})
export class DashboardModule { }
