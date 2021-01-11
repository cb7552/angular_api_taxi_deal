import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../@core/services';
import { AlertService } from '../@core/services/alert.service';
import { PresenceService } from '../@core/services/presence.service';
import { SidebarService } from '../@core/services/sidebar.service';
import { UserDetails, UserLogin } from './_entities/login.data.model';
import { GLOBAL_MESSAGES } from '../@core/entities/constants';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signInForm: FormGroup;
  forgotForm: FormGroup;
  showLoginPage: boolean;
  loginDetails = new UserLogin();
  userDetails: UserDetails;
  //isEnableWebSite: boolean;
  public showMenu = false;
  hide: boolean;
  constructor(
    private presenceService: PresenceService,
    private router: Router,
    public sidebar: SidebarService,
    private http: HttpClient,
    // public toasterService: ToasterService,
    // public apisevice: ApiService,
    // public eventsService: EventsService,
    // private messagingService: MessagingService,
    private _formBuilder: FormBuilder,
    // private Driver: DriverService,
    private _authService: AuthService,
    private _alertService: AlertService
  ) { this.showLoginPage = true; }

  ngOnInit() {
    console.log('showLoginPage', this.showLoginPage);
    this.formInitilize();
  }
  formInitilize() {
    this.signInForm = this._formBuilder.group({
      // tslint:disable-next-line:max-line-length
      email: [null, Validators.compose([Validators.required, Validators.pattern(/^([_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,5}))|(\d+$)$/)])],
      password: ['', Validators.required],
      role: ['', Validators.required],
      website: 'string',
      deviceId: 'string',
      domain: 'string'
    });
    this.forgotForm = this._formBuilder.group({
      // tslint:disable-next-line:max-line-length
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^([_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,5}))|(\d+$)$/)])]
    });
  }
  get f() {
    return this.signInForm.controls;
  }
  get g() {
    return this.forgotForm.controls;
  }

  switchPage(type: string) {
    if (type === 'FORGOT') {
      this.showLoginPage = false;
    } else {
      this.showLoginPage = true;
    }
  }

  /* selectRole(modal: string) {
   if (modal === 'ROLE_USER' || modal === 'ROLE_ADMIN') {
      this.isEnableWebSite = false;*/

  selectRole(value) {
    if (value === 'ROLE_USER' || value === 'ROLE_ADMIN') {
      this.signInForm.setValue({
        "email": this.signInForm.controls['email'].value,
        "password": this.signInForm.controls['password'].value,
        "role": this.signInForm.controls['role'].value,
        "website": "string",
        "deviceId": 'string',
        "domain": 'string'
      });
      // this.hide = false;
    } else {
      // this.isEnableWebSite = true;
      // this.hide = true;
    }
  }
  userLogin() {
    console.log('signInForm', this.signInForm);
    if (this.signInForm.valid) {
      console.log("userloginpage")
      const inputRequest = Object.assign(this.loginDetails, this.signInForm.value);
      inputRequest.phoneNumber = this.signInForm.value.email;
      this._authService.login(inputRequest, 'LOGIN');
    } else {
      this._alertService.warn('Please enter login details');
    }

  }

  gotToForgot() {
    if (this.forgotForm.valid) {
      this._authService.getForgotPassword(this.forgotForm.value.email).subscribe(
        (res) => {
          if (res.status) {
            this._alertService.success(res.message);
            this.reset();
          }
        },
        (err) => {
          this._alertService.warn(GLOBAL_MESSAGES.ERROR_MESSAGE);
        }
      );
    } else {
      this._alertService.warn('Please enter login details');
    }
  }
  routeTo(pageName) {
    if (pageName === 'CONTACT') {
      this.router.navigate(['/contacts']);
    } else if (pageName === 'TERMS') {
      this.router.navigate(['/terms-conditions']);
    }

  }
  reset() {
    this.forgotForm.reset();
    this.formInitilize();
  }
}
