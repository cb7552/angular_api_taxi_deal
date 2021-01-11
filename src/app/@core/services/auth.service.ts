import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { AppConfigUrl } from 'src/app/_app-url.config';

import { AppUser } from '../entities/authDataModel';
import { GLOBAL_MESSAGES } from '../entities/constants';
import { AlertService } from './alert.service';
import { DataStoreService } from './data-store.service';
import { EventsService } from './events.service';
import { HttpService } from './http.service';
import { PresenceService } from './presence.service';
import { SessionStorageService } from './storage.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
  private currentUserSubject = new BehaviorSubject<AppUser>({} as AppUser);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();
  role1: any;
  currentUrl: string;
  // tslint:disable-next-line:max-line-length
  constructor(
    private _alertService: AlertService,
    private location: Location,
    private storage: SessionStorageService,
    private http: HttpService,
    private router: Router,
    private _storeService: DataStoreService,
    private _eventsService: EventsService,
    private _presenceService: PresenceService
  ) {
  }

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  public populate(returnUrl: string = '') {
    const token = this.storage.getObj('token') as AppUser;
    if (!token) {
      this.currentUserSubject.next({} as AppUser);
      // Set auth status to false
      this.isAuthenticatedSubject.next(false);
      // Remove any potential remnants of previous auth states
      this.storage.removeItem('logindetails');
      if (!returnUrl) {
        this.currentUrl = this.location.path();
        if (this.currentUrl === '') {
          this.router.navigate(['/search-home']);
        } else if (this.currentUrl !== '/') {
          this.router.navigate([this.currentUrl]);
        } else {
          this.router.navigate(['/search-home']);
        }
      } else {
        this.router.navigate([returnUrl]);
      }
    } else {
      const currentUser = this.getCurrentUser();
      const projectVal = this.storage.getObj('logindetails');
      if (Object.keys(currentUser).length === 0) {
        this.login(projectVal, 'REFRESH');
        // this.http.get('').subscribe((user: AppUser) => {
        //   this.isAuthenticatedSubject.next(true);
        //   this.currentUserSubject.next(Object.assign(token, user));
        //   this.router.navigate([this.location.path()]);
        // });
      }
    }
  }

  changPassword(modal) {
    return this.http.post('', modal);
  }

  public login(modal, type) {
    return this.http.post(AppConfigUrl.EndPoint.LoginUrl.Login, modal).subscribe(
      (user: any) => {
        if (user.jwt) { 

          this.storage.setObj('logindetails', modal);
          this._storeService.clearStore();
          
          const newToken = Object.assign(user, environment);
          this.storage.setObj('token', newToken);
          this.isAuthenticatedSubject.next(true);
          this.currentUserSubject.next(newToken);
          this._presenceService.loginUser(user.data.id);

          if (user.data.role) {
            if (type === 'REFRESH') {
              this.router.navigate([this.location.path()]);
            } else {
              this.roleBasedRoute(user.data.role);
              this._alertService.success('User login successfully!');
            }

          } else {
            this._alertService.error(user.message);
          }
        } else {
          this._alertService.error(user.message);
        }

      },
      (error) => {
        this._alertService.error(GLOBAL_MESSAGES.ERROR_MESSAGE);
      }
    );
  }

  public logout() {
    localStorage.clear();
    this.storage.removeItem('logindetails');
    this.storage.removeItem('token');
    this.storage.removeItem('projectval');
    const currentUrl = 'login';
    this.router.navigateByUrl(currentUrl).then(() => {
      this.isAuthenticatedSubject.next(false);
      this.currentUserSubject.next({} as AppUser);
      this._storeService.clearStore();
      this.router.navigated = false;
      this.router.navigate([currentUrl], { replaceUrl: true });
      /* this.router.events.subscribe((event) => {
         if (event instanceof NavigationEnd) {
           location.reload();
         }
       });*/
    });

    // return this.http.post(AppConfigUrl.EndPoint.LogoutUrl.Logout, ).subscribe(
    //   (response) => {
    //      // console.log(response);
    //     this.storage.removeItem('token');
    //     this.storage.removeItem('projectval');
    //     const currentUrl = 'login';
    //     this.router.navigateByUrl(currentUrl).then(() => {
    //       this.isAuthenticatedSubject.next(false);
    //       this.currentUserSubject.next({} as AppUser);
    //       this._storeService.clearStore();
    //       this.router.navigated = false;
    //       this.router.navigate([currentUrl], { replaceUrl: true });
    //       this.router.events.subscribe((event) => {
    //         if (event instanceof NavigationEnd) {
    //           location.reload();
    //         }
    //       });
    //     });
    //   },
    //   (error) => {
    //      // console.log(error);
    //   }
    // );
  }

  public getCurrentUser(): AppUser {
    return this.currentUserSubject.value;
  }
  public roleBasedRoute(roleName: string) {
     // console.log(roleName);
    if (roleName === 'ROLE_DRIVER') {
      this._eventsService.broadcast('refreshMenu:driver');
      this.router.navigate(['/pages/profile']);
    } else if (roleName === 'ROLE_USER') {
      this._eventsService.broadcast('refreshMenu:user');
      this.router.navigate(['/pages/profile']);
    } else if (roleName === 'ROLE_ADMIN') {
      // this._eventsService.broadcast('refreshMenu:admin');
      //this.router.navigate(['/pages/dashboard']);
      this.router.navigateByUrl('/pages/dashboard');
    } else if (roleName === 'ROLE_SUPPLIER') {
      // this._eventsService.broadcast('refreshMenu:supplier');
      //this.router.navigate(['/pages/dashboard']);
      this.router.navigate(["/pages/dashboard"]);
    } else {
      this.router.navigate(['login']);
    }
  }
  public getForgotPassword(email) {
    return this.http.get(AppConfigUrl.EndPoint.ForgotUrl.Forgotpassword + email);
  }
}
