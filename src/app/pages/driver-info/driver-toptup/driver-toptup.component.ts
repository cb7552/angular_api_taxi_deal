import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../@core/services/auth.service';
import { AppUser } from '../../../@core/entities/authDataModel';
import { DashboardServices } from '../../dashboard/_services/_dashboard.component.services';
import { GLOBAL_MESSAGES } from 'src/app/@core/entities/constants';
import { AlertService } from '../../../@core/services/alert.service';
import { DriverServices } from '../_services/_driver-info.component.services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DriverTopUp } from '../_entities/_driver-info.data.model';
import { TranslateService } from '@ngx-translate/core';
import { DataStoreService } from 'src/app/@core/services';
import { Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-driver-toptup',
  templateUrl: './driver-toptup.component.html',
  styleUrls: ['./driver-toptup.component.css']
})
export class DriverToptupComponent implements OnInit {
  isEdit = false;
  userRole: AppUser;
  myTaxis = [];
  driverDetails: DriverTopUp;
  topupForm: FormGroup;
  constructor(private _driverService: DriverServices,
    private _alertService: AlertService,
    private _authService: AuthService,
    private _dashboardServices: DashboardServices,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private translate: TranslateService,
    private _storeService: DataStoreService) { }

  ngOnInit() {
    this.userRole = this._authService.getCurrentUser();
    this.formInitilize();
    this.getMyTaxis();
    this._storeService.currentStore.subscribe((value) => {
      if (value['language'] === 'es' || value['language'] === 'fr' || value['language'] === 'gr' || value['language'] === 'it') {
        this.translate.use(value['language']);
      } else {
        this.translate.use('en');
      }
    });
  }
  get f() { return this.topupForm.controls; }
  formInitilize() {
    this.topupForm = this._formBuilder.group({
      amount: ['', Validators.required],
      wallet_type: ['', Validators.required],
    });
  }
  getMyTaxis() {
    if (this.userRole.data.supplierId > 0) {
      this._dashboardServices.getTaxiPosition(this.userRole.data.supplierId, this.userRole.data.userId).subscribe((res: any) => {
        if (res.data) {
          this.myTaxis = res.data;
        }
      }, err => {
        this._alertService.error(GLOBAL_MESSAGES.ERROR_MESSAGE);
      });
    }
  }
  editDriver(taxiId) {
    (<any>$('#driverInfo')).modal('show');
    // this._driverService.getTaxiDetails(taxiId).subscribe(
    //   (res: any) => {
    //     if (res.data) {
    //       this.driverDetails = res.data;
    //       this.topupForm.patchValue(this.driverDetails);
    //       this.isEdit = true;
    //     }
    //   },
    //   (err) => {
    //     this._alertService.error(GLOBAL_MESSAGES.ERROR_MESSAGE);
    //   }
    // );
  }
  closePopup() {
    (<any>$('#driverInfo')).modal('hide');
  }
  gotoBashboard() {
    // this.closePopup();
    this._router.navigate(['/pages/dashboard']);
  }
  addUpdateDriverTopup(e) {
    if (this.topupForm.valid) {
      const parameters = {
        'adminId': 0,
        'amount': this.topupForm.value.amount,
        'debit': 0,
        'driverId': this.driverDetails.userId,
        'id': 0,
        'paymentType': this.topupForm.value.wallet_type,
        'supplierId': this.userRole.data.supplierId,
        'total': 0,
      };
      this._driverService.topup(parameters).subscribe(res => {
        this._alertService.success('Added Successfully.');
        this.getMyTaxis();
        this.isEdit = false;
        this.reset();
      },
        err => {
          this._alertService.error(GLOBAL_MESSAGES.ERROR_MESSAGE);
        }
      );
    }
  }
  reset() {
    this.topupForm.reset();
    this.formInitilize();
  }
  cancel() {
    this.isEdit = false;
    this.reset();
  }

}
