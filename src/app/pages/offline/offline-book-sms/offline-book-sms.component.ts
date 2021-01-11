import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OfflineService } from '../_services/_offline.component.services';
import { AuthService, DataStoreService } from 'src/app/@core/services';
import { AppUser } from 'src/app/@core/entities/authDataModel';
import { MapsAPILoader } from '@agm/core';
import { AlertService } from '../../../@core/services/alert.service';
import { GLOBAL_MESSAGES } from '../../../@core/entities/constants';
import { TranslateService } from '@ngx-translate/core';
import { result } from 'src/app/registration/_entities/_registration.module';
import { CountryService } from 'ngx-international-phone-number';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offline-book-sms',
  templateUrl: './offline-book-sms.component.html',
  styleUrls: ['./offline-book-sms.component.css']
})
export class OfflineBookSmsComponent implements OnInit {
  @ViewChild('sourcesearch') public sourceElement: ElementRef;
  @ViewChild('destinationsearch') public destinationElement: ElementRef;
  @ViewChild('myDiv') public myDiv: ElementRef;
  bookingSMSForm: FormGroup;
  userRole: AppUser;
  bookMyTaxi = [];
  sourceAddress: string;
  destinationAddress: string;
  currentDriverId: number;
  lat1 = 51.673858;
  lng1 = 7.815982;
  lat2: number;
  lng2: number;
  hide: boolean;
  km: any;
  duration: any;
  results: any;
  date: string;
  currentName: String;
  numberPlate: any;
  driverNumber: any;
  phoneNumber: any;
  allowedCountries: ['IN', 'CH'];
  country: any;
  public edited = false;
  durations: any;
  searchForm: FormGroup;
  myRide: any;
  totalKM: any;
  response: any;
  isEdit: boolean;
  messages: any;
  id: any;
  driverStatus: any;
 
  constructor(private _formBuilder: FormBuilder,
    private _offlineService: OfflineService,
    private _authService: AuthService,
    private _mapsApiLoader: MapsAPILoader,
    private _ngZone: NgZone,
    private _alertService: AlertService,
    private translate: TranslateService,
    private _storeService: DataStoreService,
    private _router: Router) { }

  ngOnInit() {
    this.userRole = this._authService.getCurrentUser();
    this.formInitilize();
    this.getMyTaxis();
    this.getLocations();
    
    this.date = new Date().toISOString();
    //this.initMap();
    this._storeService.currentStore.subscribe((value) => {
      if (value['language'] === 'es' || value['language'] === 'fr' || value['language'] === 'gr' || value['language'] === 'it') {
        this.translate.use(value['language']);
      } else {
        this.translate.use('en');
      }
    });
      }
  get f() { return this.bookingSMSForm.controls; }
  formInitilize() {
    this.bookingSMSForm = this._formBuilder.group({
      phoneNumber: ['', Validators.required],
      name: ['', Validators.required],
      message: ['', Validators.required],
      source: [''],
      destination: [''],
      rolename: [''],
      userTotalPrice: [''],
      totalPrice: ['']
          });
    this.searchForm = this._formBuilder.group({
      source: ['', Validators.required],
      destination: ['', Validators.required],
      cartype: [''],
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
        }

      }, _err => {

      });
    }

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
            this.Init();
            this.initMap();
          });
        });
      });
    // this.outputData = this.searchService.getResultData();
        
  }

  getSearchResult() {
    this.getLocations();
    this.initMap();
    document.getElementById("myForm").style.display = "block";
  }
 
  selectDriver(driverId) {
    this.currentDriverId = parseInt(driverId);
    let allowedCountries = ['IN', 'CH'];
     for(let i=0; i<=this.bookMyTaxi.length; i++) {

       if (this.currentDriverId === this.bookMyTaxi[i].driverId) {

         this.numberPlate = this.bookMyTaxi[i].oneSignalValue;
         this.currentName = this.bookMyTaxi[i].name;
         this.driverNumber = this.bookMyTaxi[i].phoneNumber;
         this.currentDriverId = this.bookMyTaxi[i].driverId;
         this.driverStatus = this.bookMyTaxi[i].driverStatus
         this.edited = true;
         this.country = this.phoneNumber
         let countries  = require('country-data').countries;
         for (let j=0; j<=allowedCountries.length; j++) {
           if (require('country-data') === allowedCountries) {  
            this.country = require('country-data').countries.countryCallingCodes;
         } else {
          this.country = require('country-data').countries.countryCallingCodes;
         }
        }
      } else {
       
       //  // console.log("current Namer else", this.currentName);
       }
     }
  
} 
  bookBySMS() {
    if (this.bookingSMSForm.valid) {
      const inputRequest = {
        bookingId: 0,
        comment: this.bookingSMSForm.value['message'],
        country: "+91",
        destination: this.destinationAddress,
        driverId: this.currentDriverId,
        driverName: this.currentName,
        driverPhoneNumber: this.driverNumber,
        endDate: this.date,
        endTIme: 0,
        id: 0,
        name: this.bookingSMSForm.value['name'],
        otp: "string",
        source: this.sourceAddress,
        startDate: this.date,
        totalPrice: this.bookingSMSForm.value['userTotalPrice'],
        travelTime: this.myRide.userTravelTime,
        userId: 0,
        userPhoneNumber: this.bookingSMSForm.value['phoneNumber'],
        vechileNumber: this.numberPlate
      };
      this._offlineService.createSms(inputRequest).subscribe((res: any) => {
        this.getMyTaxis();
        this.formRest();
        this.totalKM = "";
        // location.reload();
        this._alertService.success(res.message);
        },
        _err => {
          this._alertService.error(GLOBAL_MESSAGES.ERROR_MESSAGE);

        }
      );
    } else {
      this._alertService.warn('Please enter all details');
    }
  }
  formRest() {
    this.bookingSMSForm.reset();
    this.formInitilize();
  }

  routeTo() {
    this._router.navigate(['pages/ride-calculation']);
  }

  Init(){
    var origin1 = {lat: this.lat1, lng: this.lng1};
    var destinationB = {lat: this.lat2, lng: this.lng2};
    var geocoder = new google.maps.Geocoder;
  
    var service = new google.maps.DistanceMatrixService;
    service.getDistanceMatrix({
      origins: [origin1],
      destinations: [ destinationB],
      travelMode: google.maps.TravelMode.DRIVING
     
    }, function(response, status) {
      if (status !== google.maps.DistanceMatrixStatus.OK) {
       
      } else {
        var originList = response.originAddresses;
        var destinationList = response.destinationAddresses;
        var outputDiv = document.getElementById('output');
        var showGeocodedAddressOnMap = function(asDestination) {
       };
  
        for (var i = 0; i < originList.length; i++) {
          var results = response.rows[i].elements;
         
          for (var j = 0; j < results.length; j++) {
            
            outputDiv.innerHTML += results[j].distance.text + ' in ' +
                results[j].duration.text + '<br>';
                this.durations = results[j].duration.text;
          }
        }
      }
    });
  }

  initMap() {
    // this.searchAddress();
    const pointA = new google.maps.LatLng(this.lat1, this.lng1),
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
      }),
      markerA = new google.maps.Marker({
        position: pointA,
        title: 'point A',
        label: 'A',
        map: map
      }),
      markerB = new google.maps.Marker({
        position: pointB,
        title: 'point B',
        label: 'B',
        map: map
      });

    // get route from A to B
    // this.calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB);

    directionsService.route({
      origin: pointA,
      destination: pointB,
      travelMode: google.maps.TravelMode.DRIVING
    }, this.destination.bind(this));

  }
  destination(response) {
     // console.log("ride response",response);
    const pointA = new google.maps.LatLng(this.lat1, this.lng1),
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
      }),
      markerA = new google.maps.Marker({
        position: pointA,
        title: 'point A',
        label: 'A',
        map: map
      }),
      markerB = new google.maps.Marker({
        position: pointB,
        title: 'point B',
        label: 'B',
        map: map
      });

    directionsDisplay.setDirections(response);
    if (response.status === 'OK') {
      directionsDisplay.setDirections(response);
      this.response = response;
      const distance = response.routes[0].legs[0].distance.text;
      let km = 1000;
      let km2 = distance;
      km2 = km2.replace(/ | /g,'')
      let totalkm = parseFloat(distance) / 1000;
      this.totalKM = totalkm * 1000;
           
      
      //duration calculation
      const duration = response.routes[0].legs[0].duration.text;
      let time = duration;
      time = time.replace(/ | /g,'')

       let num = parseInt(duration);
       let hours = (num / 60);
       let rhours = Math.floor(hours);
       let minutes = (hours - rhours) * 60;
       let rminutes = Math.round(minutes);
       this.duration = num;
           
      const inputRequest = {
        category: 'string',
        distance: this.totalKM,
        elapsedTime: 12,
        googleKm: this.totalKM,
        latitude: this.lat1,
        longitude: this.lng1,
        region: 'string',
        rideId: 0,
        sourceLatitude: this.lat2,
        sourceLongitude: this.lng2,
        status: 'string',
        type: 'string'
      };
      this._offlineService.getFarResult(inputRequest).subscribe(
        (res: any) => {
          if (res.data) {
            this.myRide = res.data;
            this.bookingSMSForm.patchValue(this.myRide);
            this._alertService.success(this.messages);
           
            this.isEdit = true;
          }
        },
        (err) => {
          this._alertService.error(GLOBAL_MESSAGES.ERROR_MESSAGE);
        }
      );
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  }
  clearForm() {
    this.isEdit = false;
  }
  
  closeForm() {
    document.getElementById("myForm").style.display = "none";
  }


}
