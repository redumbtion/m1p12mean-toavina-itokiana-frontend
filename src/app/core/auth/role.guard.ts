import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, UserRole } from './auth.service';

export const roleGuard = (allowedRoles: UserRole[]) => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const currentUser = authService.getCurrentUser();

    if (!currentUser) {
      return router.createUrlTree(['/login']);
    }

    if (allowedRoles.includes(currentUser.role)) {
      return true;
    }

    // Redirect to dashboard if user has wrong role
    return router.createUrlTree(['/dashboard']);
  };
};
