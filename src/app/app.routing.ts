import { Route } from '@angular/router';

import { LayoutComponent } from 'app/layout/layout.component';
import { noAuthGuard } from './core/auth/guards/noAuth.guard';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    { path: '', pathMatch: 'full', redirectTo: 'user/sign-in' },

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

];
