import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { adminRoutes } from './admin.routing';
import { AccountComponent } from './account/account.component';
import { MovementsComponent } from './movements/movements.component';
import { AccountModelComponent } from './account/account-model/account-model.component';
import { CategoryAcountComponent } from './category-acount/category-acount.component';
import { CategoryMovementComponent } from './category-movement/category-movement.component';
import { CategoryMovementModelComponent } from './category-movement/category-movement-model/category-movement-model.component';
import { CategoryAcountModelComponent } from './category-acount/category-acount-model/category-acount-model.component';
import { MovementModelComponent } from './movements/movement-model/movement-model.component';
import { TransferMovementComponent } from './transfer-movement/transfer-movement.component';
import { TransferMovementModelComponent } from './transfer-movement/transfer-movement-model/transfer-movement-model.component';



@NgModule({
  declarations: [
    DashboardComponent,
    AccountComponent,
    MovementsComponent,
    AccountModelComponent,
    CategoryAcountComponent,
    CategoryMovementComponent,
    CategoryMovementModelComponent,
    CategoryAcountModelComponent,
    MovementModelComponent,
    TransferMovementComponent,
    TransferMovementModelComponent
  ],
  imports: [
    RouterModule.forChild(adminRoutes),
    CommonModule,
    SharedModule
  ]
})
export class DashboardModule { }
