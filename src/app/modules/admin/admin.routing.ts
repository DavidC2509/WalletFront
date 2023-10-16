import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

export const adminRoutes: Route[] = [
    {
        path     : 'home',
        component: DashboardComponent
    },
    
];
