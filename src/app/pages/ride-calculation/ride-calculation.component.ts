import { MapsAPILoader } from '@agm/core';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DataStoreService } from 'src/app/@core/services';

import { GLOBAL_MESSAGES } from '../../@core/entities/constants';
import { AlertService } from '../../@core/services/alert.service';
import { RideCalculationServices } from './_services/_ride-calculation.services';

@Component({
  selector: 'app-ride-calculation',
  templateUrl: './ride-calculation.component.html',
  styleUrls: ['./ride-calculation.component.css']
})
export class RideCalculationComponent implements OnInit {
  searchForm: FormGroup;
  rideForm: FormGroup;
  sourceAddress: String;
  destinationAddress: string;
  lat1 = 51.673858;
  lng1 = 7.815982;
  zoom = 10;
  finalSearchResult = [];
  isEnable = false;
  @ViewChild('sourcesearch') public sourceElement: ElementRef;
  @ViewChild('destinationsearch') public destinationElement: ElementRef;
  lat2: number;
  lng2: number;
  Km: any;
  isEdit: boolean;
  myRide: any;
  response: any;
  Time: any;
  showComponent: boolean;
  showme: boolean;
  time: any;
  km: any;
  totalKM: number;
  duration: number;
  constructor(
    private _alertService: AlertService,
    private ngZone: NgZone,
    private _mapsApiLoader: MapsAPILoader,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private translate: TranslateService,
    private _storeService: DataStoreService,
    private _rideCalculationService: RideCalculationServices) {
  }

  ngOnInit() {
    this.formIntilize();
    this.searchAddress();
    this._storeService.currentStore.subscribe((value) => {
      if (value['language'] === 'es' || value['language'] === 'fr' || value['language'] === 'gr' || value['language'] === 'it') {
        this.translate.use(value['language']);
      } else {
        this.translate.use('en');
      }
    });

  }
  getDistanceFromLatLonInKm() {
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(this.lat2 - this.lat1);  // deg2rad below
    const dLng = this.deg2rad(this.lng2 - this.lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(this.lat1)) * Math.cos(this.deg2rad(this.lat2)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    this.Km = d;
    return d;

  }

  deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  formIntilize() {
    this.searchForm = this._formBuilder.group({
      source: ['', Validators.required],
      destination: ['', Validators.required],
      cartype: [''],
    });

    this.rideForm = this._formBuilder.group({
      source: [localStorage.getItem('sourceAddress'), Validators.required],
      destination: [localStorage.getItem('destinationAddress'), Validators.required],
      cartype: [''],
    })
  }

  searchAddress() {
    this._mapsApiLoader.load().then(
      () => {
        const sourceautocomplete = new google.maps.places.Autocomplete(this.sourceElement.nativeElement, { types: ['geocode'] });
        const destinationautocomplete = new google.maps.places.Autocomplete(this.destinationElement.nativeElement, { types: ['geocode'] });
        // Set initial restrict to the greater list of countries.
        sourceautocomplete.setComponentRestrictions(
          { 'country': ['in', 'ch'] });
        // Set initial restrict to the greater list of countries.
        destinationautocomplete.setComponentRestrictions(
          { 'country': ['in', 'ch'] });

        sourceautocomplete.addListener('place_changed', () => {
          this.ngZone.run(() => {
            const place: google.maps.places.PlaceResult = sourceautocomplete.getPlace();
            this.sourceAddress = place.formatted_address;
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }

            this.lat1 = place.geometry.location.lat();
            this.lng1 = place.geometry.location.lng();
            this.zoom = 12;
          });
        });

        destinationautocomplete.addListener('place_changed', () => {
          this.ngZone.run(() => {
            const place: google.maps.places.PlaceResult = destinationautocomplete.getPlace();
            this.destinationAddress = place.formatted_address;
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
            this.lat2 = place.geometry.location.lat();
            this.lng2 = place.geometry.location.lng();
            this.zoom = 12;
          });
        });
      
      });
  }
  getSearchResult() {
    this.searchAddress();
    this.initMap();
    
    this.isEdit = true;

  }

  conditionValidation(): boolean {
    if (!this.searchForm.value.source) {
      this._alertService.warn('Please enter source');
      return false;
    } else if (!this.searchForm.value.destination) {
      this._alertService.warn('Please enter destination');
      return false;
    }
   
    return true;
  }

  clearForm() {
    this.isEdit = false;
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
      this._rideCalculationService.getFarResult(inputRequest).subscribe(
        (res: any) => {
          if (res.data) {
            this._alertService.success(res.data);
            this.myRide = res.data;
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
  routeTo(){
    this._router.navigate(['/pages/offline/offline-book-sms']);
  }
}


