import { Route } from '@angular/router';

import { LayoutComponent } from 'app/layout/layout.component';
import { noAuthGuard } from './core/auth/guards/noAuth.guard';
import { AuthGuard } from './core/auth/guards/auth.guard';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    { path: '', pathMatch: 'full', redirectTo: 'dashboard/home' },

    // Auth routes for guests
    {
        path: '',
        canActivate: [noAuthGuard],
        canActivateChild: [noAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            { path: 'user', loadChildren: () => import('app/modules/auth/aut.module').then(m => m.AuthModule) },
        ]
    },

    // Admin routes
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'classic'
        },
        children: [
            {
                path: 'dashboard',
                loadChildren: () =>
                    import('app/modules/admin/dashboard.module').then(
                        (m) => m.DashboardModule
                    ),
            },
        ]
    }

];
