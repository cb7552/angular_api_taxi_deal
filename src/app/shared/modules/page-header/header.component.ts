import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SessionStorageService } from 'src/app/@core/services';
import { AlertService } from 'src/app/@core/services/alert.service';

import { AppUser } from '../../../@core/entities/authDataModel';
import { AuthService } from '../../../@core/services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { DataStoreService } from '../../../@core/services/data-store.service';
import { environment } from 'src/environments/environment';

declare var $: any;
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private currentUserSubject = new BehaviorSubject<AppUser>({} as AppUser);
  role: AppUser;
  oldPassword: string;
  newPassword: string;
  ChangePassForm: FormGroup;
  userRole: AppUser;
  currentUrl: string;
  isAdmin: boolean;
  imagePath: string;
  isIndia = false;
  // tslint:disable-next-line:max-line-length
  constructor(private _storeService: DataStoreService, private translate: TranslateService, private _authService: AuthService, private storage: SessionStorageService, private formBuilder: FormBuilder, private _router: Router, private _alertService: AlertService) { }
  ngOnInit() {
    this.isAdmin = false;
    this.role = this._authService.getCurrentUser();
    this.checkEnvi();
    this.formIntilize();
    const language = localStorage.getItem('language');
    if (language) {
      this.switchLanguage(language);
    } else {
      this.switchLanguage('en');
    }

  }
  checkEnvi() {
    if (this.role.industry === 'INDIA') {
      this.isIndia = false;
    } else if (this.role.industry === 'SWISS') {
      this.isIndia = true;
    }
  }

  formIntilize() {
    this.ChangePassForm = this.formBuilder.group({
      oldPassword: [''],
      newPassword: ['']
    });
  }

  gotoHome() {
    this._authService.roleBasedRoute(this.role.data.role);
  }

  gotoLogout() {
    this._authService.logout();
  }

  changePassword(val) {
    const param = {
      oldPassword: val.oldPassword,
      newPassword: val.newPassword
    };

    this._authService.changPassword(param).subscribe((res) => {
      if (res.result === 'failed') {
        this._alertService.error('Invalid current password');
      } else {
        //  $('#change-password').modal().hide();
        $('#change-password').modal('hide');
        this._alertService.success('Updated successfully!');
      }
    });
  }

  switchLanguage(language: string) {
    const urlPath = '../assets/img/flag/';
    if (language === 'en') {
      this.imagePath = urlPath + 'united-kingdom-flag-icon.png';
    } else if (language === 'gr') {
      this.imagePath = urlPath + 'germany-flag-icon.png';
    } else if (language === 'fr') {
      this.imagePath = urlPath + 'france-flag-icon.png';
    } else if (language === 'it') {
      this.imagePath = urlPath + 'italy-flag-icon.png';
    } else if (language === 'es') {
      this.imagePath = urlPath + 'spain-flag-icon.png';
    }
    localStorage.setItem('language', language);
    this._storeService.setData('language', language);
    this.translate.use(language);
  }

  routeTo(pageName: string) {
    if (pageName === 'SIGNIN') {
      this._router.navigate(['/login']);
    } else if (pageName === 'REGISTRATION') {
      this._router.navigate(['/registration']);
    } else if (pageName === 'SEARCH') {
      this._router.navigate(['/search-home']);
    } else if (pageName === 'TERM') {
      this._router.navigate(['/terms-coditions']);
    } else if (pageName === 'CONTACT') {
      this._router.navigate(['/contacts']);
    } else if (pageName === 'HELPS') {
      this._router.navigate(['/helps']);
    } else if (pageName === 'SUPPLIER') {
      this._router.navigate(['/pages/dashboard']);
    } else if (pageName === 'DRIVER') {
      this._router.navigate(['profile']);
    } else if (pageName === 'TRACKING') {
      this._router.navigate(['/tracking']);
    }
  }

}
