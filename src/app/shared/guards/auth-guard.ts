import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return true;
  /*  const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      const expectedRole = route.data.expectedRole;
      if (expectedRole) {
        // expectedRole.forEach(role => {
        if (this.authenticationService.verifyPermissionNgIf(expectedRole[0])) {
          return true;
        } else {
          this.router.navigate(['/pages/notpermited']);
          return false;
        }
        //  });

      } else {
        return true;
      }

    }


    this.router.navigate(['/auth/login'], {
      queryParams: { returnUrl: state.url }
    });
    return false;*/
  }
}
