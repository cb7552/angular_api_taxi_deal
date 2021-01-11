import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MessagingService } from 'src/app/@core/services/messaging.service';
import { AlertService } from 'src/app/@core/services/alert.service';
import { MapsAPILoader, LatLngLiteral } from '@agm/core';
import { AuthService, DataStoreService } from 'src/app/@core/services';
import { OfflineService } from '../_services/_offline.component.services';
import { OfflineUser } from '../_entities/offline.data.model';
import { AppUser } from 'src/app/@core/entities/authDataModel';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-message-booking',
  templateUrl: './message-booking.component.html',
  styleUrls: ['./message-booking.component.css']
})
export class MessageBookingComponent implements OnInit {

  @ViewChild('sourcesearch') public sourceElement: ElementRef;
  @ViewChild('destinationsearch') public destinationElement: ElementRef;
  bookMessageForm: FormGroup;
  sourceAddress: string;
  destinationAddress: string;
  userRole: AppUser;
  bookMyTaxi: any;
  offlineUser: OfflineUser;
  lat: number;
  lng: number;
  driver: any;
  lat1: number;
  lng1: number;
  lat2: number;
  lng2: number;
  
  constructor(private _formBuilder: FormBuilder,
    private _offlineService: OfflineService,
    private _authService: AuthService,
    private _mapsApiLoader: MapsAPILoader,
    private _ngZone: NgZone,
    private _alertService: AlertService,
    private _messagingService: MessagingService,
    private translate: TranslateService,
    private _storeService: DataStoreService) { }

  ngOnInit() {
    this.userRole = this._authService.getCurrentUser();
    this.formInitilize();
    this.getMyTaxis();
    this.getLocations();
    this._storeService.currentStore.subscribe((value) => {
      if (value['language'] === 'es' || value['language'] === 'fr' || value['language'] === 'gr' || value['language'] === 'it') {
        this.translate.use(value['language']);
      } else {
        this.translate.use('en');
      }
    });
  }
  get f() { return this.bookMessageForm.controls; }
  formInitilize() {
    this.bookMessageForm = this._formBuilder.group({
      source: ['', Validators.required],
      destination: ['', Validators.required],
      driver: ['', Validators.required],
      remarks: ['', Validators.required],
    });
  }
  getLocations() {
    this._mapsApiLoader.load().then(
      () => {
        const autocomplete = new google.maps.places.Autocomplete(this.sourceElement.nativeElement, { types: ['geocode'] });
        const destinationautocomplete = new google.maps.places.Autocomplete(this.destinationElement.nativeElement, { types: ['geocode'] });
        // Set initial restrict to the greater list of countries.
        autocomplete.setComponentRestrictions(
          { 'country': ['in', 'ch'] });
        // Set initial restrict to the greater list of countries.
        destinationautocomplete.setComponentRestrictions(
          { 'country': ['in', 'ch'] });

        autocomplete.addListener('place_changed', () => {
          this._ngZone.run(() => {
            const place: google.maps.places.PlaceResult = autocomplete.getPlace();
            this.sourceAddress = place.formatted_address;
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
             this.lat1 = place.geometry.location.lat();
             this.lng1 = place.geometry.location.lng();
            // this.zoom = 12;
          });
        });

        destinationautocomplete.addListener('place_changed', () => {
          this._ngZone.run(() => {
            const place: google.maps.places.PlaceResult = destinationautocomplete.getPlace();
            this.destinationAddress = place.formatted_address;
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
            this.lat2 = place.geometry.location.lat();
            this.lng2 = place.geometry.location.lng();
          });
        });
      });
    // this.outputData = this.searchService.getResultData();
  }
  GetAddress(lat: number, lng: number) {
		return new Promise((resolve, reject) => {
		  let geocoder = new google.maps.Geocoder();
		  const latlng: LatLngLiteral = {
			lat: lat,
			lng: lng
		  };
		  latlng.lat = this.lat;
		  latlng.lng = this.lng;
	
		  let request = { 'location': latlng };
		  geocoder.geocode(request, (results, status) => {
			if (status === google.maps.GeocoderStatus.OK) {
			  if (results[0]) {
				resolve(results[0].formatted_address);
			  }
			}
			resolve('Cannot find location');
		  });
		});
	  }
  getMyTaxis() {
    if (this.userRole.data.supplierId && this.userRole.data.userId) {
      const inputRequest = {
        supplierId: this.userRole.data.supplierId,
        userId: this.userRole.data.userId
      };
      this._offlineService.taxiPosition(inputRequest).subscribe((res: any) => {
        if (res.data) {
          this.bookMyTaxi = res.data;
          //this.bookMyTaxi = this.bookMyTaxi;
			    //this.driver = this.bookMyTaxi[];
        }

      }, err => {

      });
    }
  }

  sendPushNotification(e) {
    if (this.bookMessageForm.valid) {
      // tslint:disable-next-line:max-line-length
       // console.log("drivris", this.driver.name);
       // console.log(this.sourceAddress, this.destinationAddress, "Driver Name ---- ",this.driver.name,"----", this.bookMessageForm.value.remarks);
      this._messagingService.sendPushMessage(this.sourceAddress, this.destinationAddress, this.driver.name, this.driver.driverId, this.bookMessageForm.value.remarks);
      this.bookMessageForm.reset();
      this.formInitilize();
    } else {
      this._alertService.warn('Please fill mandatory fields');
    }
  }
  addUpdateDriverTopup() {
    const inputRequest = {
      adminId: 0,
      amount: this.bookMessageForm.value.amount,
      debit: 0,
      driverId: this.offlineUser.userId,
      id: 0,
      paymentType: this.bookMessageForm.value.wallet_type,
      supplierId: this.userRole.data.supplierId,
      total: 0,
    };
    this._offlineService.driverTopup(inputRequest).subscribe((res: any) => {
      this.getMyTaxis();
    },
      err => {

      }
    );
  }
  initMap() {
    this.getLocations();
    let pointA = new google.maps.LatLng(this.lat1, this.lng1),
      pointB = new google.maps.LatLng(this.lat2, this.lng2),
      myOptions = {
        zoom: 7,
        center: pointA
      },
      map = new google.maps.Map(document.getElementById('map-canvas'), myOptions),
      // Instantiate a directions service.
      directionsService = new google.maps.DirectionsService,
      directionsDisplay = new google.maps.DirectionsRenderer({
        map: map
      })
    
  
    // get route from A to B
     //this.calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB);

     directionsService.route({
      origin: pointA,
      destination: pointB,
      travelMode: google.maps.TravelMode.DRIVING
    }, function(response, status) {
      directionsDisplay.setDirections(response);
        if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        this.response = response;
        let distance = response.routes[0].legs[0].distance.text;
        this.km = distance;
        let duration = response.routes[0].legs[0].duration.text;
        this.time = duration;
         // console.log('kkk',this.km);
         // console.log('resssss',this.time);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
      this.Km = this.km;
      this.Time = this.time;
       // console.log('kkk',this.Km);
       // console.log('resssss',this.Time);
    });
    
  }
}
