import { Injectable } from '@angular/core';
import { AuthService } from '../services';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  public canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated;
  }
}
