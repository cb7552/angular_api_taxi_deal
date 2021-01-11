import { MapsAPILoader } from '@agm/core';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DataStoreService } from 'src/app/@core/services';
import { PresenceService } from 'src/app/@core/services/presence.service';
import * as carTypeJson from '../../pages/_configuration/cartye.json';
import { ratingElement } from '../../@core/common/ratingElement';
import { AlertService } from '../../@core/services/alert.service';
import { SearchServices } from '../_services/search.component.services';
import { ProfileServices } from '../../pages/profile/_services/_profile.component.services';
import { GLOBAL_MESSAGES } from 'src/app/@core/entities/constants.js';

declare var $: any;
@Component({
  selector: 'app-search-result',
  templateUrl: './drivers-search-result-list.component.html',
  styleUrls: ['./drivers-search-result-list.component.scss'],
})
export class DriverSearchResultComponent implements OnInit {
  public dateValue: Date = new Date("YY/DD/YYYY HH:mm");
  latitude: 51.673858;
  longitude: 7.815982;
  locationChosen = false;
  resultloader = false;
  public param: any;
  public rating: number;
  public searchForm: FormGroup;
  public sourceAddress: string;
  public destinationAddress: string;
  public lat = 51.673858;
  public lng = 7.815982;
  public zoom = 10;
  public taxi_list: any = [];
  public finalSearchResult: any = [];
  public displayRatingScore: any;
  public inputRequest: any = {
    category: '',
    dateTime: '',
    destination: '',
    distance: 0,
    id: 0,
    km: 0,
    latitude: '',
    longitude: '',
    radius: 0,
    source: '',
    type: '',
  };
  public isEnable: boolean;
  @ViewChild('sourcesearch') public sourceElement: ElementRef;
  @ViewChild('destinationsearch') public destinationElement: ElementRef;
  @ViewChild('categoryTAXI') public categoryTAXIElement: ElementRef;
  @ViewChild('categoryOUT') public categoryOUTElement: ElementRef;
  @ViewChild('categoryRENT') public categoryRENTElement: ElementRef;
  @ViewChild('Sourcesearch') public SourceElement: ElementRef;
  @ViewChild('SourcesSearch') public SourcesElement: ElementRef;
  id: any;
  reviewDetails: any;
  selectedCarType: any;
  details: any;
  offlineDatas: any;
  map: google.maps.Map;
  isTracking = false;
  marker: google.maps.Marker;
  selectedMarker;

  output: any;
  response: any;
  outputData: any;
  allData: any;
  cartype: any;
  path = '../assets/img/type/';
  imagePath: string;
  public starRatingElements: Array<ratingElement> = [];
  category: any;
  dlng: any;
  dlat: any;
  careTypeData = [];
  totalKM: number;
  duration: number;
  durations: any;
  distance: any;
  totalprice: string;
  dataTime: any;
  usertotalprice: any;
  onChoseLocation(event) {
    this.latitude = event.coords.latitude;
    this.longitude = event.coords.longitude;
    this.locationChosen = true;

    if (!this.marker) {
      this.marker = new google.maps.Marker({
        map: this.map,
      });
    }
  }

  constructor(
    private translate: TranslateService,
    private _storeService: DataStoreService,
    private _alertService: AlertService,
    private _mapsApiLoader: MapsAPILoader,
    private _formBuilder: FormBuilder,
    private _searchService: SearchServices,
    private _route: ActivatedRoute,
    private ngZone: NgZone,
    private _router: Router,
    private _presenceService: PresenceService,
    private _profileService: ProfileServices
  ) {

  }

  ngOnInit() {
    // this.careTypeData = <any>carTypeJson.default;ss
    this.getCategoryType();
    this.distance = localStorage.getItem("distance");
    this.durations = localStorage.getItem("duration");
    this.totalprice = localStorage.getItem("totalprice");
    this.usertotalprice = localStorage.getItem("usertotalprice");
    setTimeout(() => {
      $('body').removeClass('hideloader');
    }, 500);
    this.resultloader = true;
    this.searchIniaite();
    let ratingElement1 = new ratingElement();
    ratingElement1.checkedcolor = "orange";
    ratingElement1.value = 0;
    ratingElement1.size = 20;
    this.starRatingElements.push(ratingElement1);
    
    console.log("prices",localStorage.getItem("totalprice"));
  }
  getCategoryType() {
    this._profileService.getCategoryTypeAll().subscribe((res: any) => {
      if (res) {
        this.careTypeData = res;
      }
    }, err => {
      this._alertService.error(GLOBAL_MESSAGES.ERROR_MESSAGE);
    });
  }
  searchIniaite() {
    // console.log('params', this._route.snapshot.params);
    this.param = localStorage.getItem('searchcriteria');
    // console.log('this.paramsssssss', this.param);
    this.rating = 3;

    this.taxi_list = [
      {
        name: 0,
      },
      {
        name: 0,
      },
      {
        name: 0,
      },
      {
        name: 0,
      },
      {
        name: 0,
      },
      {
        name: 0,
      },
    ];



    if (this.param) {
      // console.log(this.param);
      this.formIntilize();
      this.searchAddress();

      try {
        const param_data = JSON.parse(window.atob(this.param));
        if (typeof param_data === 'object') {
          this.inputRequest = param_data;
          console.log("detailss",this.inputRequest);
          this.lat = this.inputRequest.latitude;
          this.lng = this.inputRequest.longitude;
          this.cartype = this.inputRequest.type;
          this.category = this.inputRequest.category;
          this.dataTime = this.inputRequest.dataTime;
          this.searchForm.patchValue(this.inputRequest);
          this.resultloader = true;
          setTimeout(() => {
            this.getResult(this.inputRequest);
            this.resultloader = false;
          }, 500);

        } else {
          this._alertService.warn('Param not valid');
        }
      } catch (error) {
        // console.log(error);
        this._alertService.warn('Param not valid');
      }
    }
  }

  formIntilize() {
    this.searchForm = this._formBuilder.group({
      source: [localStorage.getItem('sourceAddress'), Validators.required],
      destination: [localStorage.getItem('destinationAddress')],
      cartype: [localStorage.getItem('cartype')],
      category: [localStorage.getItem('category')],
      dateTime: [localStorage.getItem('dateTime')]
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
            this.dlat = place.geometry.location.lat();
            this.dlng = place.geometry.location.lng();
            // this.initMap();
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

  selectCar(modal) {
    // console.log(modal);
    // this._router.navigate(['/search-car-details/' + modal.id + '/' + modal.driverId]);
  }
  changeCarType(cartype) {
    this.searchForm.patchValue({ cartype: cartype });
  }
  getSearchResult() {
    this.finalSearchResult = [];
    // console.log(this.searchForm.value);
    const validate = this.conditionValidation();
    if (validate) {
      // tslint:disable-next-line:max-line-length
      if (this.destinationAddress !== '' && undefined !== this.destinationAddress) { this.inputRequest.destination = this.destinationAddress; }
      if (this.sourceAddress !== '' && undefined !== this.sourceAddress) { this.inputRequest.source = this.sourceAddress; }

      this.inputRequest.latitude = this.lat;
      this.inputRequest.longitude = this.lng;
      this.inputRequest.type = this.searchForm.value['cartype'];
      this.inputRequest.category = this.category;
      this.inputRequest.dateTime = this.searchForm.value['dateTime'];
      this.getResult(this.inputRequest);
      localStorage.setItem('destinationAddress', this.destinationAddress);
      localStorage.setItem('sourceAddress', this.sourceAddress);
      localStorage.setItem('cartype', this.searchForm.value['cartype']);
      localStorage.setItem('category', this.searchForm.value['category']);
      localStorage.setItem('dateTime', this.searchForm.value['dateTime']);
      this.initMap();
    }
  }

  getCarSearchResult(item) {
    // console.log('getCarSearchResult', item);
    const param = window.btoa(JSON.stringify(item));
    this._router.navigate(['/search-home/search-car-details/' + item.id]);
    localStorage.setItem("name",item.name);
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

  getResult(inputRequest) {
    // console.log(inputRequest);
    this._searchService
      .getSearchResult(inputRequest)
      .subscribe(res => {
        this.finalSearchResult = res.data;
        let filter_result = [];
        res.data.forEach(element => {
          if ((this.searchForm.value['cartype'] == "All") || (this.searchForm.value['cartype'] == "")) {
            filter_result.push(element);
            // console.log("If: Element cartype", element.cartype);
          } else {
            if (this.searchForm.value['cartype'] == element.cartype) {
              filter_result.push(element);
              switch (element.cartype) {
                case 'Auto': this.imagePath = `${this.path}Auto.png`; break;
                case 'Taxi': this.imagePath = `${this.path}Taxi.png`; break;
                case 'Taxi4': this.imagePath = `${this.path}Taxi4.png`; break;
                case 'Taxi6': this.imagePath = `${this.path}Taxi6.png`; break;
                case 'Transport': this.imagePath = `${this.path}Volvo`; break;
                case 'Mini/Hatchback (Seats 4+1)': this.imagePath = `${this.path}Taxi`; break;
                case 'Seadan (Seats 4+1)': this.imagePath = `${this.path}Taxi4`; break;
                case 'SUV-Tavara (Seats 7+1)': this.imagePath = `${this.path}Taxi6`; break;
                case 'SUV-Innova (Seats 7+1)': this.imagePath = `${this.path}Taxi6`; break;
                case 'Tempo Traveller (Seats 12+1)': this.imagePath = `${this.path}Volvo`; break;
                default: break;
              }
              // console.log("Else: Element cartype", element.cartype);
            }
          }
        });
        let addData = {
          sourceAddress: this.sourceAddress,
          lat: this.lat,
          destinationAddress: this.destinationAddress,
          lng: this.lng,
        };

        localStorage.setItem('searchAddress', JSON.stringify(addData));

        this.allData = res;
        this.output = res;
        this.finalSearchResult = filter_result;

        this._searchService.setResultData(this.finalSearchResult);
        // console.log("Search output", this.finalSearchResult)
        this.selectMarker(event);
        if (this.finalSearchResult.length > 0) {
          this.isEnable = true;
        } else {
          this.isEnable = false;
        }
      });
  }

  addMarker(latitude: number, logintude: number) {
    //this.finalSearchResult.push({ latitude, logintude, alpha: 0.4 });
    this.finalSearchResult.push({ latitude, logintude });
  }
  max(coordType: 'latitude' | 'logintude'): number {
    return Math.max(...this.finalSearchResult.map(marker => marker[coordType]));
  }
  min(coordType: 'latitude' | 'logintude'): number {
    return Math.min(...this.finalSearchResult.map(marker => marker[coordType]));
  }
  selectMarker(event) {
    this.selectedMarker = {
      latitude: event.latitude,
      logintude: event.longitude
    };
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
  // initMap() {
  //   var directionsRenderer = new google.maps.DirectionsRenderer;
  //   var directionsService = new google.maps.DirectionsService;
  //   var map = new google.maps.Map(document.getElementById('map'), {
  //     zoom: 14,
  //     center: { lat: this.lat, lng: this.lng }
  //   });
  //   directionsRenderer.setMap(map);
  //   var selectedMode = document.getElementById('mode');
  //   directionsService.route({
  //     origin: { lat: this.lat, lng: this.lng },  // Haight.
  //     destination: { lat: this.dlat, lng: this.dlng },  // Ocean Beach.
  //     // Note that Javascript allows us to access the constant
  //     // using square brackets and a string value as its
  //     // "property."
  //     travelMode: google.maps.TravelMode.DRIVING
  //   }, function (response, status) {
  //     if (status == google.maps.DirectionsStatus.OK) {
  //       directionsRenderer.setDirections(response);
  //       console.log("directin",response);
  //     } else {
  //       window.alert('Directions request failed due to ' + status);
  //     }
  //   });
  // }

  initMap() {
    const pointA = new google.maps.LatLng(this.lat, this.lng),
      pointB = new google.maps.LatLng(this.dlat, this.dlng),
     
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
      pointB = new google.maps.LatLng(this.dlat, this.dlng),
     
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
        sourceLatitude: this.dlat,
        sourceLongitude: this.dlng,
        status: 'string',
        travelTime: 0,
        type: this.searchForm.value['cartype'],
        waitingTime: 0
      };
      this._searchService.getFarResult(inputRequest).subscribe(
        (res: any) => {
          this.response = res.data;
         console.log("searchservice",res.data.userTotalPrice);
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

