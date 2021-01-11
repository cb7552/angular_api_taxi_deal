import { DataStoreService } from 'src/app/@core/services';

import { MapsAPILoader } from '@agm/core';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { AlertService } from '../../@core/services/alert.service';
import * as carTypeJson from '../../pages/_configuration/cartye.json';
import { SearchServices } from '../_services/search.component.services';
import { GLOBAL_MESSAGES } from 'src/app/@core/entities/constants';

declare var $: any;


@Component({
  selector: 'app-search-dashboard',
  templateUrl: './search-dashboard.component.html',
  styleUrls: ['./search-dashboard.component.scss']
})

export class SearchDashboardComponent implements OnInit {
  public dateValue: Date = new Date("YY/DD/YYYY HH:mm");
  searchForm: FormGroup;
  sourceAddress: string;
  destinationAddress: string;
  lat = 51.673858;
  lng = 7.815982;
  zoom = 10;
  finalSearchResult = [];
  isEnable = false;
  @ViewChild('sourcesearch') public sourceElement: ElementRef;
  @ViewChild('destinationsearch') public destinationElement: ElementRef;
  @ViewChild('categoryTAXI') public categoryTAXIElement: ElementRef;
  @ViewChild('categoryOUT') public categoryOUTElement: ElementRef;
  @ViewChild('categoryRENT') public categoryRENTElement: ElementRef;
  @ViewChild('Sourcesearch') public SourceElement: ElementRef;
  @ViewChild('SourceSearch') public SourcesElement: ElementRef;
  cartype: any;
  category: any;
  careTypeData = [];
  lat1: number;
  lng1: number;
  response: any;
  totalKM: number;
  duration: number;
  distance: any;
  durations: any;
  totalprice: any;
  usertotalprice: any;
  isIndia = false;
  constructor(
    private _alertService: AlertService,
    private _searchService: SearchServices,
    private ngZone: NgZone,
    private _mapsApiLoader: MapsAPILoader,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private translate: TranslateService,
    private _storeService: DataStoreService) {
  }

  ngOnInit() {
    // this.careTypeData = <any>carTypeJson.default;
    this.formIntilize();
    this.searchAddress();
    this.getCategoryType();
    this._storeService.currentStore.subscribe((value) => {
      if (value['language'] === 'es' || value['language'] === 'fr' || value['language'] === 'gr' || value['language'] === 'it') {
        this.translate.use(value['language']);
      } else {
        this.translate.use('en');
      }
    });
    this.category = "TAXI";
  }

  formIntilize() {
    this.searchForm = this._formBuilder.group({
      source: ['', Validators.required],
      destination: [''],
      cartype: ['', Validators.required],
      dateTime: ['']
    });
  }

  searchAddress() {
    this._mapsApiLoader.load().then(
      () => {
        const sourceautocomplete = new google.maps.places.Autocomplete(this.sourceElement.nativeElement, { types: ['geocode'] });
        const destinationautocomplete = new google.maps.places.Autocomplete(this.destinationElement.nativeElement, { types: ['geocode'] });
        const Sourceautocomplete = new google.maps.places.Autocomplete(this.SourceElement.nativeElement, { types: ['geocode'] });
        const Sourcesautocomplete = new google.maps.places.Autocomplete(this.SourcesElement.nativeElement, { types: ['geocode'] });

        // Set initial restrict to the greater list of countries.
        sourceautocomplete.setComponentRestrictions(
          { 'country': ['in', 'ch', 'gb'] });
        // Set initial restrict to the greater list of countries.
        destinationautocomplete.setComponentRestrictions(
          { 'country': ['in', 'ch', 'gb'] });

        // Set initial restrict to the greater list of countries.
        Sourceautocomplete.setComponentRestrictions(
          { 'country': ['in', 'ch', 'gb'] });

        // Set initial restrict to the greater list of countries.
        Sourcesautocomplete.setComponentRestrictions(
          { 'country': ['in', 'ch', 'gb'] });

        sourceautocomplete.addListener('place_changed', () => {
          this.ngZone.run(() => {
            const place: google.maps.places.PlaceResult = sourceautocomplete.getPlace();
            this.sourceAddress = place.formatted_address;
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }

            this.lat = place.geometry.location.lat();
            this.lng = place.geometry.location.lng();
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
            this.lat1 = place.geometry.location.lat();
            this.lng1 = place.geometry.location.lng();
             this.initMap();
          });
        });

        Sourceautocomplete.addListener('place_changed', () => {
          this.ngZone.run(() => {
            const place: google.maps.places.PlaceResult = Sourceautocomplete.getPlace();
            this.sourceAddress = place.formatted_address;
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }

            this.lat = place.geometry.location.lat();
            this.lng = place.geometry.location.lng();
            this.zoom = 12;
          });
        });

        Sourcesautocomplete.addListener('place_changed', () => {
          this.ngZone.run(() => {
            const place: google.maps.places.PlaceResult = Sourcesautocomplete.getPlace();
            this.sourceAddress = place.formatted_address;
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }

            this.lat = place.geometry.location.lat();
            this.lng = place.geometry.location.lng();
            this.zoom = 12;
          });
        });

      });
  }

  changeCarType(cartype) {
    this.searchForm.patchValue({ cartype: cartype });
  }
  getSearchResult() {
    this.finalSearchResult = [];
    const inputRequest = {
      category: this.category,
      dateTime: this.searchForm.value['dateTime'],
      destination: this.destinationAddress,
      distance: 0,
      id: 0,
      km: 0,
      latitude: this.lat,
      longitude: this.lng,
      radius: 0,
      source: this.sourceAddress,
      type: this.searchForm.value['cartype']
      };
    localStorage.setItem('destinationAddress', this.destinationAddress);
    localStorage.setItem('sourceAddress', this.sourceAddress);
    localStorage.setItem('cartype', this.searchForm.value['cartype']);
    localStorage.setItem('category', this.searchForm.value['category']);
    localStorage.setItem('dateTime', this.searchForm.value['dateTime']);
    const validate = this.conditionValidation();
    if (validate) {
      const param = window.btoa(JSON.stringify(inputRequest));
      localStorage.setItem('searchcriteria', param);
      this._router.navigate(['/search-home/search-taxi']);
    }
  }

  conditionValidation(): boolean {
    if (!this.searchForm.value.source) {
      this._alertService.warn('Please enter source');
      return false;
    }
    // else if (!this.searchForm.value.destination) {
    //   this._alertService.warn('Please enter destination');
    //   return false;
    // }
    // else if (!this.searchForm.value.cartype) {
    //   this._alertService.warn('Please select type');
    //   return false;
    // }
    return true;
  }

  selectCar(modal) {
    this._router.navigate(['/search-home/search-result/' + modal.id + '/' + modal.driverId]);
  }

  getCategoryType() {
    this._searchService.getCategoryTypeAll().subscribe((res: any) => {
      if (res) {
        this.careTypeData = res;
      }
    }, err => {
      this._alertService.error(GLOBAL_MESSAGES.ERROR_MESSAGE);
    });


  }
  routeTO(pageName: string) {
    if (pageName === 'ABOUT') {
      window.open('http://taxideals.ch/about.html');
    } else if (pageName === 'TERM') {
      this._router.navigate(['']);
    } else if (pageName === 'CONTACT') {
      this._router.navigate(['']);
    } else if (pageName === 'HELP') {
      window.open('http://taxideals.ch/help/faq/user/index.html');
    } else if (pageName === 'FACEBOOK') {
      window.open('https://www.facebook.com/taxideals.swiss/#!');
    } else if (pageName === 'TWITTER') {
      window.open('https://twitter.com/taxideals_ch/#!');
    }

  }

  categoryTaxi() {
    this.category = this.categoryTAXIElement.nativeElement.attributes.value.nodeValue;
  }
  categoryOut() {
    this.category = this.categoryOUTElement.nativeElement.attributes.value.nodeValue;
  }
  categoryRent() {
    this.category = this.categoryRENTElement.nativeElement.attributes.value.nodeValue;
  }

  initMap() {
    const pointA = new google.maps.LatLng(this.lat, this.lng),
      pointB = new google.maps.LatLng(this.lat1, this.lng1),
     
      // Instantiate a directions service.
      directionsService = new google.maps.DirectionsService,
      directionsDisplay = new google.maps.DirectionsRenderer({
       
      }),
      markerA = new google.maps.Marker({
        position: pointA,
        title: 'point A',
        label: 'A',
        
      }),
      markerB = new google.maps.Marker({
        position: pointB,
        title: 'point B',
        label: 'B',
       
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
    const pointA = new google.maps.LatLng(this.lat, this.lng),
      pointB = new google.maps.LatLng(this.lat1, this.lng1),
     
      // Instantiate a directions service.
      directionsService = new google.maps.DirectionsService,
      directionsDisplay = new google.maps.DirectionsRenderer({
        
      }),
      markerA = new google.maps.Marker({
        position: pointA,
        title: 'point A',
        label: 'A',
        
      }),
      markerB = new google.maps.Marker({
        position: pointB,
        title: 'point B',
        label: 'B',
       
      });

    directionsDisplay.setDirections(response);
    if (response.status === 'OK') {
      directionsDisplay.setDirections(response);
      this.response = response;
      this.distance = response.routes[0].legs[0].distance.text;
      this.durations = response.routes[0].legs[0].duration.text;
      localStorage.setItem("distance",this.distance);
      localStorage.setItem("duration",this.durations);
      let km = 1000;
      let km2 = this.distance;
      km2 = km2.replace(/ | /g,'')
      let totalkm = parseFloat(this.distance) / 1000;
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
        category: this.category,
        destination: this.destinationAddress,
        discount: 0,
        distance: this.totalKM,
        domain: "string",
        elapsedTime: 0,
        googleKm: this.totalKM,
        latitude: this.lat,
        longitude: this.lng,
        region: 'Tamil Nadu',
        rideId: 0,
        sourceLatitude: this.lat1,
        sourceLongitude: this.lng1,
        status: 'string',
        travelTime: 0,
        type: this.searchForm.value['cartype'],
        waitingTime: 0
      };
      this._searchService.getFarResult(inputRequest).subscribe(
        (res: any) => {
          this.response = res.data;
         console.log("searchservice",res.data);
         localStorage.setItem('response', this.response);
         this.totalprice = res.data.userTotalPrice;
         this.usertotalprice = res.data.totalPrice;
         localStorage.setItem('totalprice', this.totalprice);
         localStorage.setItem('usertotalprice', this.usertotalprice);
        },
        (err) => {
          this._alertService.error(GLOBAL_MESSAGES.ERROR_MESSAGE);
        }
      );
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  }
}


