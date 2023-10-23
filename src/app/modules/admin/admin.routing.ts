import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountComponent } from './account/account.component';
import { CategoryAcountComponent } from './category-acount/category-acount.component';
import { CategoryMovementComponent } from './category-movement/category-movement.component';
import { MovementsComponent } from './movements/movements.component';
import { TransferMovementComponent } from './transfer-movement/transfer-movement.component';

export const adminRoutes: Route[] = [
    {
        path: 'home',
        component: DashboardComponent
    },

    {
        path: 'accounts',
        component: AccountComponent
    },

    {
        path: 'category-accounts',
        component: CategoryAcountComponent
    },

    {
        path: 'category-movements',
        component: CategoryMovementComponent
    },

    {
        path: 'movements',
        component: MovementsComponent
    },

    {
        path: 'movements-transfer',
        component: TransferMovementComponent
    },

];
