import {inject} from '@angular/core';
import { Router } from '@angular/router';

import { AuthServerProvider } from '../AuthServerProvider.Service';

export const noAuthGuard = () => {
  const authService = inject(AuthServerProvider);
  const router = inject(Router);

  
  if (!authService.check()) {
    
    return true;
  }

  // Redirect to the login page
  return router.parseUrl('/user/sign-in');
};