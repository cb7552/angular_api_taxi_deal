import { MapsAPILoader } from '@agm/core';
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SearchServices } from '../_services/search.component.services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../../@core/services/alert.service';
import { GLOBAL_MESSAGES } from '../../@core/entities/constants';
import { DataStoreService } from 'src/app/@core/services';
import { TranslateService } from '@ngx-translate/core';
import { HostListener } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { review } from '../_entities/_search.module';
import * as moment from 'moment';
import { AuthService } from '../../@core/services/auth.service';
import { StarRatingComponent } from 'ng-starrating';
import { ratingElement } from '../../@core/common/ratingElement';
import { DatePipe } from '@angular/common'
declare var $: any;
@Component({
  selector: 'app-search-result',
  templateUrl: './search-car-details.component.html',
  styleUrls: ['./search-car-details.component.scss'],
})
@HostListener('window:popstate', ['$event'])

export class SearchCarDetailsComponent implements OnInit {
  public dateValue: Date = new Date ("YY/DD/YYYY HH:mm");
  latitude = 51.678418;
  longitude = 7.809007;
  locationChosen = false;
  public reviewDetails: any = [];
  public param: any;
  currentDriverId: any;
  public rating: number;
  public searchForm: FormGroup;
  public sourceAddress: string;
  public destinationAddress: string;
  public lat = 51.673858;
  public lng = 7.815982;
  public zoom = 10;
  public inputRequest: any = {
    destination: '',
    distance: 0,
    id: 0,
    km: 0,
    latitude: '',
    longitude: '',
    radius: 0,
    source: '',
    type: 'string'
  };
  /* carDetails: any = {
     name:'',
     waitingTime: 0
   }; */
  carDetails: any;
  public isEnable: boolean;

  score: number = 0;
  displayRatingScore: any[];

  @ViewChild('sourcesearch') public sourceElement: ElementRef;
  @ViewChild('destinationsearch') public destinationElement: ElementRef;
  contactForm: FormGroup;
  Result: any;
  id: any;

  image2: any;
  name: any;
  review: any;

  faoRate;
  faoRated = false;
  rating3: number;
  selectedMarker: { latitude: any; logintude: any; };
  public starRatingElements: Array<ratingElement> = [];
  reviewForm: FormGroup;
  driverId: any;
  userRole: any;
  rate: number;
  category: any;
  message: string;
  date: string;
  isTAXI: boolean;
  isRENT: boolean;
  start: string;
  lat1: number;
  lng1: number;
  totalKM: number;
  distance: any;
  response: any;
  durations: any;
  duration: number;
  totalprice: any;
  prices: any;
  usertotalprice: any;
  isIndia = false;

  /* onChoseLocation(event){
     this.latitude = event.coords.lat; 
     this.longitude = event.coords.lng;
     this.locationChosen = true;
   } */

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
    private _sanitizer: DomSanitizer,
    private _authService: AuthService,
    public datepipe: DatePipe
  ) {
   
  }

  ngOnInit() {
    this.currentDriverId = this._route.snapshot.params['driverid'];
    this.name = localStorage.getItem('name');
    this.date = new Date().toISOString();
    this.start = new Date(localStorage.getItem('time')).toISOString()
   this.distance =localStorage.getItem("distance");
   this.durations = localStorage.getItem("duration"); 
   this.totalprice = localStorage.getItem("totalprice");
   this.usertotalprice = localStorage.getItem("usertotalprice");
    this.formIntilize();
    this.getreview();
    this.searchAddress();
    // this.searchIniaite();
    this._storeService.currentStore.subscribe((value) => {
      if (value['language'] === 'es' || value['language'] === 'fr' || value['language'] === 'gr' || value['language'] === 'it') {
        this.translate.use(value['language']);
      } else {
        this.translate.use('en');
      }
    });
    this.userRole = this._authService.getCurrentUser();
    let ratingElement1 = new ratingElement();
    ratingElement1.checkedcolor = "orange";
    ratingElement1.value = 0;
    ratingElement1.size = 20;
    this.starRatingElements.push(ratingElement1);
  }
  onRate($event: { oldValue: number, newValue: number, starRating: StarRatingComponent }) {
    this.rate = $event.newValue;
    alert(`Your Rating: ${$event.newValue}`);
  }

  onPopState(event) {
    //  // console.log('Back button pressed');
    event.preventDefault();
  }

  searchIniaite() {
    // this.param = this._route.snapshot.params;
    //  // console.log('this.paramsData', this.param);
    // if (this.param.data) {
    //   // this.formIntilize();
    //   // this.searchAddress();

    //   try {
    //     const param_data = JSON.parse(window.atob(this.param.data));
    //     if (typeof param_data === 'object') {
    //        // console.log('Param_Dataa', param_data);
    //       this.carDetails = param_data;
    //       this.latitude = this.carDetails.latitude;
    //       this.longitude = this.carDetails.longitude;
    //       this.faoRate = this.carDetails.star;
    //       this.rating3 = this.carDetails.star;
    //        // console.log('ratinggg', this.faoRate);
    //       this.id = this.carDetails.id;
    //       this.driverId = this.carDetails.driverId;
    //       this.name = this.carDetails.name;
    //       let base64 = this.carDetails.imageInfo.imageUrl;
    //       this.image2 = base64.replace(/data\:image\/(jpeg|jpg|png)\;base64\,/gi, '');
    //     } else {
    //       this._alertService.warn('Param not valid');
    //     }
    //   } catch (error) {
    //      // console.log(error)
    //     this._alertService.warn('Param not valid');
    //   }
    // }
  }
  getDriverInfo() {

  }


  onFaoRate() {
    this.faoRated = true;
    //this.faoRate = e;
    this.faoRate = this.carDetails.star;
  }

  formIntilize() {
    this.contactForm = this._formBuilder.group({
      source: [localStorage.getItem('sourceAddress'), Validators.required],
      destination: [localStorage.getItem('destinationAddress')],
      name: ['', Validators.required],
      email: ['', Validators.required],
      phonenumber: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required],
      endDate : ['', Validators.required],
      startDate : [localStorage.getItem('dateTime'), Validators.required],
    });
    this.reviewForm = this._formBuilder.group({
      comment: ['', Validators.required]
    });
  }
  get f() { return this.contactForm.controls; }
  searchAddress() {
    this._mapsApiLoader.load().then(
      () => {
        const sourceautocomplete = new google.maps.places.Autocomplete(this.sourceElement.nativeElement, { types: ['geocode'] });
        const destinationautocomplete = new google.maps.places.Autocomplete(this.destinationElement.nativeElement, { types: ['geocode'] });
        // Set initial restrict to the greater list of countries.
        sourceautocomplete.setComponentRestrictions(
          { 'country': ['in', 'ch', 'gb'] });
        // Set initial restrict to the greater list of countries.
        destinationautocomplete.setComponentRestrictions(
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
      });
  }

  getSearchResult() {
    //  // console.log(this.searchForm.value);
    const validate = this.conditionValidation();
    if (validate) {
      if (this.destinationAddress != '' && undefined != this.destinationAddress) this.inputRequest.destination = this.destinationAddress;
      if (this.sourceAddress != '' && undefined != this.sourceAddress) this.inputRequest.source = this.sourceAddress;

      this.inputRequest.latitude = this.lat;
      this.inputRequest.longitude = this.lng;
      this.SubmitRequest(this.inputRequest);
    }
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

  SubmitRequest(inputRequest) {
    //  // console.log(inputRequest)
  }

  submitContactForm() {
    // let endDate = this.contactForm.value['endDate'].replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")
    // let startDate = this.contactForm.value['startDate'].replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")
    if (this.contactForm.valid) {
      const inputRequest = {
        carType: this.carDetails.cartype,
        destination: this.contactForm.value['destination'],
        email: this.contactForm.value['email'],
        endDate: this.contactForm.value['endDate'],
        id: 0,
        message: this.message + ', ' + this.contactForm.value['message'],
        name: this.contactForm.value['name'],
        phonenumber: this.contactForm.value['phonenumber'],
        senderMail: 'taxideals.ch@gmail.com',
        source: this.contactForm.value['source'],
        startDate: this.contactForm.value['startDate'],
        subject: this.contactForm.value['subject'],
        taxiId: this.id
      };
      this._searchService
        .postContactForm(inputRequest)
        .subscribe(res => {
          this.Result = res.data;
           // console.log('Result', res);
          this._alertService.success(res.data);
          this.contactForm.reset();
        },
          err => {
            this._alertService.error(GLOBAL_MESSAGES.ERROR_MESSAGE);
          }
        );
    } else {
      this._alertService.warn('Please enter all details');
    }
  }
  getreview() {
     // console.log('id----1', this.id);
    this._searchService.getReview(this.currentDriverId).subscribe(
      (res: any) => {
        if (res.data) {
          this.reviewDetails = res.data;
          if (this.reviewDetails.length > 0) {
            this.isEnable = true;
          } else {
            this.isEnable = false;
          }
           // console.log("reviewId", this.reviewDetails);
        }
      },
      (err) => {
        this._alertService.error(GLOBAL_MESSAGES.ERROR_MESSAGE);
      }
    );
    this.name = this.name ? this.name : 'test';
    this._searchService.getTaxiDetailS(this.currentDriverId, this.name).subscribe(response => {
      if (response.status === true) {
         // console.log('response name', response);
        this.score = response.data;
        this.carDetails = response.data;
        this.displayRatingScore = response.data.star;
         // console.log('response review', this.displayRatingScore);
        if (this.currentDriverId) {
          this.latitude = this.carDetails.latitude;
          this.longitude = this.carDetails.longitude;
          this.faoRate = this.carDetails.star;
          this.rating3 = this.carDetails.star;
           // console.log('ratinggg', this.faoRate);
          this.id = this.carDetails.id;
          this.driverId = this.carDetails.driverId;
          this.name = this.carDetails.name;
          let base64 = this.carDetails.imageInfo ? this.carDetails.imageInfo.imageUrl : '';
          this.image2 = base64.replace(/data\:image\/(jpeg|jpg|png)\;base64\,/gi, '');
          this.category = this.carDetails.category;
          this.message ='Source Address' + ': ' + localStorage.getItem('sourceAddress') + '; ' +  'CarType' + ': ' + this.carDetails.cartype + ', ' +  this.carDetails.hour + '' + 'HOURS' + ', ' + this.carDetails.km + ''  + 'KMS' + ',' + ' Price' + ': ' + this.carDetails.price;
          this._searchService.getPrice(this.carDetails.id).subscribe(response => {
           if(this.carDetails.cartype === response.data.type) {
             this.prices = response.data;
           } else {
             this.isTAXI = false;
            //  this.prices = this.carDetails;
           } 
          });
          this.checkEnvi();
          }

      }
      this.selectCategory(this.category);  
    });

  }
  selectCategory(category) {
   
      if (category == "OUTSTATION" || category == "RENT") {
         // console.log("category - OutStation: ", this.category);
         // console.log("OutStation - Price: ", this.carDetails.price, "Base Price :",  this.carDetails.basePrice);
      } else {
         // console.log("category - Taxi", this.category);
         // console.log("Taxi - Price: ", this.carDetails.price, "Base Price :",  this.carDetails.basePrice);
      }
    
  }
  onRateChange = (score) => {
    this.score = score;
  }

  addMarker(latitude: number, logintude: number) {
    this.carDetails.push({ latitude, logintude });
  }
  max(coordType: 'latitude' | 'logintude'): number {
    return Math.max(...this.carDetails.map(marker => marker[coordType]));
  }
  min(coordType: 'latitude' | 'logintude'): number {
    return Math.min(...this.carDetails.map(marker => marker[coordType]));
  }
  selectMarker(event) {
    this.selectedMarker = {
      latitude: event.latitude,
      logintude: event.longitude
    };
  }

  postreview() {
    if (this.reviewForm.valid) {
      const inputRequest = {
        comment: this.reviewForm.value['comment'],
        driverId: this.driverId,
        formattedDate: "string",
        id: 0,
        imageInfo: {
          "blobkey": "string",
          "fileName": "string",
          "imageUrl": "string"
        },
        postedBy: "string",
        rating: this.rate,
        rideId: 3000,
        taxiDetailId: this.id,
        updatedOn: moment().format(),
        userFullName: this.carDetails.name,
        userId: this.driverId
      };
      this._searchService.postReview(inputRequest).subscribe(res => {
        this.Result = res.data;
        this.getreview();
        //  // console.log('Result', res);
        this._alertService.success(res.message);

        this.reviewForm.reset();
      },
        err => {
          this._alertService.error(GLOBAL_MESSAGES.ERROR_MESSAGE);
        }
      );
    }
  }

  checkEnvi() {
    if (this.carDetails.category === 'TAXI') {
      this.isTAXI = true;
      this.isRENT = false;
    } else if(this.carDetails.category === 'RENT'){
      this.isRENT = true;
      this.isTAXI = false;
    } else if(this.carDetails.category === 'OUTSTATION'){
      this.isRENT = true;
      this.isTAXI = false;
    } else {
      this.isTAXI = false;
    } 

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
         console.log("searchservice",res.data.userTotalPricess);
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
