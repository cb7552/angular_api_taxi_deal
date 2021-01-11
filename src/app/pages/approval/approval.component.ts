import { Component, OnInit } from '@angular/core';
import { AppUser } from '../../@core/entities/authDataModel';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService, DataStoreService } from 'src/app/@core/services';
import { AlertService } from 'src/app/@core/services/alert.service';
import { ApprovalServices } from './_services/_approval.component.services';
import { GLOBAL_MESSAGES } from '../../@core/entities/constants';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.css']
})
export class ApprovalComponent implements OnInit {
  isEdit = false;
  userRole: AppUser;
  outputdata = [];
  approvalForm: FormGroup;
  currentDriverId: string;
  currentTaxiId: string;
  editDetails: any;
  constructor(private _router: Router,
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _alertService: AlertService,
    private _approvalService: ApprovalServices,
    private translate: TranslateService,
    private _storeService: DataStoreService) { }

  ngOnInit() {
    this.userRole = this._authService.getCurrentUser();
    this.formInitilize();
    this.getNonApprovedTaxis();
    this._storeService.currentStore.subscribe((value) => {
      if (value['language'] === 'es' || value['language'] === 'fr' || value['language'] === 'gr' || value['language'] === 'it') {
        this.translate.use(value['language']);
      } else {
        this.translate.use('en');
      }
    });
  }
  formInitilize() {
    this.approvalForm = this._formBuilder.group({
      drivername: [''],
      price: [''],
      seats: [''],
      driverPhonenumber: [''],
      peakPrice: [''],
      taxiNumber: [''],
      carType: [''],
      vehicleBrand: [''],
      year: [''],
      status: ['']
    });
  }
  getNonApprovedTaxis() {
    this._approvalService.taxiApproves(this.userRole.data.supplierId, this.userRole.data.userId).subscribe(response => {
      this.outputdata = response.data;
    },
      err => {
        this._alertService.error(GLOBAL_MESSAGES.ERROR_MESSAGE);
         // console.log(err);
        alert('Error');
      }
    );
  }
  onSelete(id) : void {
   if (confirm("Please Verify Collect Proper document about Vehicle and driver") == true) {
    if (id) {
      this._approvalService.getApproved(id, this.userRole.data.userId).subscribe(response => {
        if (response.status === true) {
          this._alertService.success(response.data);
          this.getNonApprovedTaxis();
        } else {
          this._alertService.error(response.data);
        }
      
      },
        err => {
          this._alertService.error(GLOBAL_MESSAGES.ERROR_MESSAGE);
        }
      );
    }
  } else {

  }
  }
  editDriver(exp) {
    this.isEdit = true;
    this._approvalService.getTaxiDetails(exp.id).subscribe((res: any) => {
      if (res.data) {
        this.editDetails = res.data;
        this.approvalForm.patchValue(this.editDetails);
        // this.approvalForm.patchValue(res.data);
        this.currentDriverId = this.editDetails.userId;
        this.currentTaxiId = this.editDetails.taxiId;
      }

    }, err => {
       // console.log(err);
    });
  }
  vechicleDriver(formModal) {
    const param = {
      'active': true,
      'additionalInformation': 'string',
      'airPortprice': 0,
      'basePrice': parseInt(formModal.basePrice, 10),
      'carType': formModal.carType,
      'city': 'string',
      'cityDTO': {
        'code': 'string',
        'countryId': 0,
        'description': 'string',
        'id': 0,
        'lang': 'string',
        'name': 'string',
        'region': 'string',
        'zipCode': 'string'
      },
      'currency': 'string',
      'description': 'string',
      'destination': 'string',
      'driverPhonenumber': formModal.driverPhonenumber + '',
      'drivername': 'string',
      'id': 0,
      'imageInfos': [
        {
          'blobkey': 'string',
          'fileName': 'string',
          'imageUrl': 'string'
        }
      ],
      'latitude': 0,
      'longitude': 0,
      'name': 'string',
      'peakPrice': parseInt(formModal.peakPrice, 10),
      'perDay': 0,
      'phoneNumber': 'string',
      'pickUpLocation': 'Any',
      'price': parseInt(formModal.price, 10),
      'seats': parseInt(formModal.seats, 10),
      'source': 'string',
      'status': 'string',
      'supplierDTO': {
        'id': 0,
        'licenseNumber': 'string',
        'name': 'string',
        'userId': 0
      },
      'supplierId': this.userRole.data.supplierId,
      'tags': [
        'string'
      ],
      'taxiId': this.currentTaxiId,
      'taxiNumber': formModal.taxiNumber,
      'transporttype': 'airport',
      'updatedOn': 'string',
      'userId': this.currentDriverId,
      'vehicleBrand': formModal.vehicleBrand,
      'vehicleTypeDTO': {
        'description': 'string',
        'id': 0,
        'lang': 'string',
        'code': 'string',
        'name': 'string'
      },
      'vehicleYear': 0,
      'waitingTime': 0,
      'weekEndOffer': 0,
      'year': parseInt(formModal.year, 10)
    };
    this._approvalService.updateVehicleInfo(param).subscribe((response: any) => {
      if (response.status === true) {
        this._alertService.success(response.message);
        // this._router.navigate(['/pages/driver-info/driver-status']);
      } else {
        this._alertService.error(response.message);
      }
      this.cancel();
      this.getNonApprovedTaxis();
    }, err => {
       // console.log(err);
    });
  }
  deactiveDriver(id) {
     // console.log(id);
  }
  cancel() {
    this.isEdit = false;
    this.approvalForm.reset();
    this.formInitilize();
  }
}
