import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppUser } from 'src/app/@core/entities/authDataModel';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AuthService, SessionStorageService, DataStoreService } from 'src/app/@core/services';
import { Router, NavigationEnd } from '@angular/router';
import { AlertService } from 'src/app/@core/services/alert.service';
import { filter } from 'rxjs/operators';

declare var $: any;
@Component({
  selector: 'app-auth-header',
  templateUrl: './auth-header.component.html',
  styleUrls: ['./auth-header.component.css']
})
export class AuthHeaderComponent implements OnInit {
  private currentUserSubject = new BehaviorSubject<AppUser>({} as AppUser);
  role: AppUser;
  oldPassword: string;
  newPassword: string;
  ChangePassForm: FormGroup;
  userRole: AppUser;
  currentUrl: string;
  imagePath: string;
  isDriver = false;
  isUser = false;
  isAdmin = false;
  isSupplier = false;
  isDriverTopup = false;
  isDashboard = false;
  isDriverStatus = false;
  isAddNewDriver = false;
  isProfile = false;
  isApproval = false;
  isMap = false;
  isMessageBook = false;
  isOffLineBookSms = false;
  isTripHistory = false;
  isContact = false;
  isIndia = false;
  // tslint:disable-next-line:max-line-length
  constructor(private translate: TranslateService,
    private _storeService: DataStoreService,
    private _authService: AuthService,
    private storage: SessionStorageService,
    private formBuilder: FormBuilder,
    private _router: Router,
    private _alertService: AlertService) {
    this._router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((res: any) => {
      if (res.url === '/pages/dashboard') {
        this.isDashboard = true;
        this.isDriverTopup = false;
        this.isDriverStatus = false;
        this.isAddNewDriver = false;
        this.isProfile = false;
        this.isApproval = false;
        this.isMap = false;
        this.isMessageBook = false;
        this.isOffLineBookSms = false;
        this.isTripHistory = false;
        this.isContact = false;

      } else if (res.url === '/pages/driver-info/driver-toptup') {
        this.isDashboard = false;
        this.isDriverTopup = true;
        this.isDriverStatus = false;
        this.isAddNewDriver = false;
        this.isProfile = false;
        this.isApproval = false;
        this.isMap = false;
        this.isMessageBook = false;
        this.isOffLineBookSms = false;
        this.isTripHistory = false;
        this.isContact = false;

      } else if (res.url === '/pages/driver-info/add-new-driver') {
        this.isDashboard = false;
        this.isDriverTopup = false;
        this.isDriverStatus = false;
        this.isAddNewDriver = true;
        this.isProfile = false;
        this.isApproval = false;
        this.isMap = false;
        this.isMessageBook = false;
        this.isOffLineBookSms = false;
        this.isTripHistory = false;
        this.isContact = false;

      } else if (res.url === '/pages/profile') {
        this.isDashboard = false;
        this.isDriverTopup = false;
        this.isDriverStatus = false;
        this.isAddNewDriver = false;
        this.isProfile = true;
        this.isApproval = false;
        this.isMap = false;
        this.isMessageBook = false;
        this.isOffLineBookSms = false;
        this.isTripHistory = false;
        this.isContact = false;

      } else if (res.url === '/pages/approval') {
        this.isDashboard = false;
        this.isDriverTopup = false;
        this.isDriverStatus = false;
        this.isAddNewDriver = false;
        this.isProfile = false;
        this.isApproval = true;
        this.isMap = false;
        this.isMessageBook = false;
        this.isOffLineBookSms = false;
        this.isTripHistory = false;
        this.isContact = false;

      } else if (res.url === '/pages/online-offline') {
        this.isDashboard = false;
        this.isDriverTopup = false;
        this.isDriverStatus = false;
        this.isAddNewDriver = false;
        this.isProfile = false;
        this.isApproval = false;
        this.isMap = true;
        this.isMessageBook = false;
        this.isOffLineBookSms = false;
        this.isTripHistory = false;
        this.isContact = false;

      } else if (res.url === '/pages/offline/offline-booking') {
        this.isDashboard = false;
        this.isDriverTopup = false;
        this.isDriverStatus = false;
        this.isAddNewDriver = false;
        this.isProfile = false;
        this.isApproval = false;
        this.isMap = false;
        this.isMessageBook = true;
        this.isOffLineBookSms = false;
        this.isTripHistory = false;
        this.isContact = false;

      } else if (res.url === '/pages/driver-info/driver-status' || res.url === '/pages/driver-info/driver-status') {
        this.isDashboard = false;
        this.isDriverTopup = false;
        this.isDriverStatus = true;
        this.isAddNewDriver = false;
        this.isProfile = false;
        this.isApproval = false;
        this.isMap = false;
        this.isMessageBook = false;
        this.isOffLineBookSms = false;
        this.isTripHistory = false;
        this.isContact = false;

      } else if (res.url === '/pages/offline/offline-book-sms' || res.url === '/pages/ride-calculation') {
        this.isDashboard = false;
        this.isDriverTopup = false;
        this.isDriverStatus = false;
        this.isAddNewDriver = false;
        this.isProfile = false;
        this.isApproval = false;
        this.isMap = false;
        this.isMessageBook = false;
        this.isOffLineBookSms = true;
        this.isTripHistory = false;
        this.isContact = false;

      } else if (res.url === '/pages/trip-details/trip-history' || res.url === '/pages/trip-details/trip-info') {
        this.isDashboard = false;
        this.isDriverTopup = false;
        this.isDriverStatus = false;
        this.isAddNewDriver = false;
        this.isProfile = false;
        this.isApproval = false;
        this.isMap = false;
        this.isMessageBook = false;
        this.isOffLineBookSms = false;
        this.isTripHistory = true;
        this.isContact = false;

      } else if (res.url === '/pages/contact') {
        this.isDashboard = false;
        this.isDriverTopup = false;
        this.isDriverStatus = false;
        this.isAddNewDriver = false;
        this.isProfile = false;
        this.isApproval = false;
        this.isMap = false;
        this.isMessageBook = false;
        this.isOffLineBookSms = false;
        this.isTripHistory = false;
        this.isContact = true;

      }
    });
  }
  ngOnInit() {
    var language = localStorage.getItem('language');
    if (this.role !== null) {
      this.role = this._authService.getCurrentUser();
      this.checkEnvi();
      this.formIntilize();
      this.displayMenu(this.role.data.role);
      language = localStorage.getItem('language');
    }


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
  routeTo(e) {
    console.log(e);
  }
  formIntilize() {
    this.ChangePassForm = this.formBuilder.group({
      oldPassword: [''],
      newPassword: ['']
    });
  }
  displayMenu(roleName: string) {
    if (roleName === 'ROLE_DRIVER') {
      this.isDriver = true;
    } else if (roleName === 'ROLE_USER') {
      this.isUser = true;
    } else if (roleName === 'ROLE_ADMIN') {
      this.isAdmin = true;
    } else if (roleName === 'ROLE_SUPPLIER') {
      this.isSupplier = true;
    }
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
  gotoMenus(pageName: string) {
    if (pageName === 'PROFILE') {
      this._router.navigate(['/pages/profile']);
    } else if (pageName === 'TRIP') {
      this._router.navigate(['/pages/trip-details/trip-history']);
    } else if (pageName === 'ADMIN') {
      this._router.navigate(['/pages/admin-list']);
    } else if (pageName === 'DASHBOARD') {
      this._router.navigate(['/pages/dashboard']);
    } else if (pageName === 'ADDNEWDRIVER') {
      this._router.navigate(['/pages/driver-info/add-new-driver']);
    } else if (pageName === 'DRIVERSTATUS') {
      this._router.navigate(['/pages/driver-info/driver-status']);
    } else if (pageName === 'APPROVAL') {
      this._router.navigate(['/pages/approval']);
    } else if (pageName === 'DRIVERTOPUP') {
      this._router.navigate(['/pages/driver-info/driver-toptup']);
    } else if (pageName === 'MAP') {
      this._router.navigate(['/pages/online-offline']);
    } else if (pageName === 'BOOKING') {
      this._router.navigate(['/pages/offline/offline-booking']);
    } else if (pageName === 'SMS') {
      this._router.navigate(['/pages/offline/offline-book-sms']);
    } else if (pageName === 'TRIPHISTORY') {
      this._router.navigate(['/pages/trip-details/trip-history']);
    } else if(pageName === 'CONTACT') {
      this._router.navigate(['/pages/contact']);
    }
    $('ul.sidebar-menu li').on('click', function () {
      $(this).addClass('active').siblings().removeClass('active');
    });

  }
}
