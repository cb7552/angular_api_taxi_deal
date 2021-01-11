import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { hasMatch } from '../common/initializer';
import { AuthService } from '../services/auth.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.checkActivation(route, state);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.checkActivation(route, state);
  }

  private checkActivation(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.currentUser.pipe(
      map((user) => {
        if (route.data && route.data.role) {
          // if (!hasMatch([route.data.role], <any>(user.userRoles).map(item => item))) {
          //     this.router.navigate(['access-denied']);
          //     return false;
          // }
          return true;
        }
        return true;
      })
    );
  }
}
