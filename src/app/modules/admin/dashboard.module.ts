import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { adminRoutes } from './admin.routing';
import { AccountComponent } from './account/account.component';
import { MovementsComponent } from './movements/movements.component';
// import { AccountModelComponent } from './account/account-model/account-model.component';



@NgModule({
  declarations: [
    DashboardComponent,
    AccountComponent,
    MovementsComponent,
    // AccountModelComponent
  ],
  imports: [
    RouterModule.forChild(adminRoutes),
    CommonModule,
    SharedModule
  ]
})
export class DashboardModule { }
