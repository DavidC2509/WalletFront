import { Route } from '@angular/router';
import { AuthSignInComponent } from 'app/modules/auth/sign-in/sign-in.component';
import { AuthSignUpComponent } from './sign-up/sign-up.component';

export const authRoutes: Route[] = [
    {
        path     : 'sign-in',
        component: AuthSignInComponent
    },
    {
        path     : 'sign-up',
        component: AuthSignUpComponent
    }
];
