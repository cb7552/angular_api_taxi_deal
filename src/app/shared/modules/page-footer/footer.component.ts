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

declare var $: any;
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
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
    this.role = this._authService.getCurrentUser();
    this.checkEnvi();
   }
   checkEnvi() {
    if (this.role.industry === 'INDIA') {
      this.isIndia = false;
    } else if (this.role.industry === 'SWISS') {
      this.isIndia = true;
    }
  }
routeTo(pageName: string) {
    if (pageName === 'SIGNIN') {
      this._router.navigate(['/login']);
    } else if (pageName === 'REGISTRATION') {
      this._router.navigate(['/registration']);
    } else if (pageName === 'SEARCH') {
      this._router.navigate(['/search-home']);
    } else if (pageName === 'TERMS') {
      this._router.navigate(['/terms-conditions']);
    } else if (pageName === 'CONTACT') {
      this._router.navigate(['/contacts']);
    }
  }

  submit =function() {
    $("form").on('submit',function(e){
      alert("Thanks for subscribe");
  //window.location.reload(true);
      return false;
   });
}
}
