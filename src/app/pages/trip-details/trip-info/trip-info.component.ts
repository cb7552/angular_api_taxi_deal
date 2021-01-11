import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AppUser } from 'src/app/@core/entities/authDataModel';
import { TripServices } from '../_services/_trip.component.services';
import { map } from 'rxjs/operators';
import { AuthService } from '../../../@core/services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { DataStoreService } from 'src/app/@core/services';
import { AlertService } from 'src/app/@core/services/alert.service';

@Component({
  selector: 'app-trip-info',
  templateUrl: './trip-info.component.html',
  styleUrls: ['./trip-info.component.css']
})
export class TripInfoComponent implements OnInit {
  tripId: string;
  tripInfoForm: FormGroup;
  userRole: AppUser;
  output: any;
  constructor(private _authService: AuthService,
    private _tripServices: TripServices,
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private translate: TranslateService,
    private _storeService: DataStoreService,
    private _alertService: AlertService) { }

  ngOnInit() {
    this.tripId = this._route.snapshot.params['tripId'];
     // console.log(this.tripId);
    this.userRole = this._authService.getCurrentUser();
    this.formInitilize();
    this.getTripInfo();
    this._storeService.currentStore.subscribe((value) => {
      if (value['language'] === 'es' || value['language'] === 'fr' || value['language'] === 'gr' || value['language'] === 'it') {
        this.translate.use(value['language']);
      } else {
        this.translate.use('en');
      }
    });
  }
  formInitilize() {
    this.tripInfoForm = this._formBuilder.group({
      driverName: [''],
      source: [''],
      destination: [''],
      price: [''],
      base: [''],
      rideStatus: [''],
      totalPrice: [''],
      travelTime: [''],
    });
  }
  getTripInfo() {
    const inputRequest = {
      roleId: this.userRole.data.role,
      supplierId: this.userRole.data.supplierId,
      userId: this.userRole.data.userId,
    };
    this._tripServices.getTrips(inputRequest).subscribe((res: any) => {
      if (res.data) {
        // tslint:disable-next-line:radix
        const selectId = parseInt(this.tripId);
        const viewDetails = res.data.filter(value => value.id === selectId);
        if (viewDetails.length) {
          this.tripInfoForm.patchValue(viewDetails[0]);
        }
      }
    });
  }
  routeTo() {
    this._router.navigate(['/pages/trip-details/trip-history']);
  }

  getinvoice() {
    this._tripServices.getinvoice(this.tripId).subscribe((res: any) => {
      this.output = res.message;
      this._alertService.success(res.message);
    });
  }
}
