import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignUpServices } from './_services/_registration.component.services';
import { Regitration } from './_entities/_registration.module';
import { MapsAPILoader } from '@agm/core';
import { AlertService } from '../@core/services/alert.service';
import { FileError, NgxfUploaderService } from 'ngxf-uploader';
import { SessionStorageService } from '../@core/services';

import { Router } from '@angular/router';
import { GLOBAL_MESSAGES } from '../@core/entities/constants';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  addRegistration = new Regitration();
  address: string;
  lat: number;
  lng: number;
  addressArray: google.maps.GeocoderAddressComponent[];
  state: any;
  imageChangedEvent: File;
  finalImage: File;
  croppedImage: any = '';
  showCropper = false;
  isEnable = false;
  filename: string;
   @ViewChild('search') searchElement: ElementRef;
  @ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent;

  // tslint:disable-next-line:max-line-length
  constructor(private _router: Router, private storage: SessionStorageService, private _uploadService: NgxfUploaderService, private _alertService: AlertService, private ngZone: NgZone, private mapsAPILoader: MapsAPILoader, private _formBuilder: FormBuilder, private _registration: SignUpServices, private _ImageInfo: SignUpServices) { }

  ngOnInit() {
    this.formInitilize();
    this.searchAddress();
  }
  formInitilize() {
    this.registerForm = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', Validators.required],
      website: ['',Validators.required],
      address: ['', Validators.required],
      photo: ['', Validators.required],
      domain: ['',Validators.required]
    });
  }
  get f() { return this.registerForm.controls; }

  saveRegistration(e) {
    let input = this.registerForm.value['phoneNumber'];
    this.registerForm.value['phoneNumber'] = input.substring(3, 13);
    if (this.registerForm.valid) {
      const parameters = {
        'address': this.address,
        'carType': 'Taxi',
        "category":'TAXI',
        'code': this.state,
        'deviceId': 'string',
        'domain': this.registerForm.value['domain'],
        'email': this.registerForm.value['email'],
        'firstName': this.registerForm.value['firstName'],
        'hourly': 0,
        'id': 0,
        'imageInfo': {
          'blobkey': 'string',
          'fileName': this.filename,
          'imageUrl': this.croppedImage
        },
        'isSocialUser': true,
        'lang': 'string',
        'lastName': this.registerForm.value['lastName'],
        'latitude': this.lat,
        'licenseNumber': 'string',
        'loginStatus': 'string',
        'longitude': this.lng,
        'notification': 'string',
        'password': this.registerForm.value['password'],
        'phoneNumber': this.registerForm.value['phoneNumber'],
        'phoneVerified': 'string',
        'price': 0,
        'push': 'string',
        'restKey': 'string',
        'role': 'ROLE_SUPPLIER',
        'socialUser': true,
        'status': 'string',
        'website': this.registerForm.value['website']
      };
      this._registration.signUp(parameters).subscribe((res: any) => {
        this._router.navigate(['/login', {}]);
        this._alertService.success(res.message);
      },
        err => {
          this._alertService.error(GLOBAL_MESSAGES.ERROR_MESSAGE);
        }
      );
    } else {
      this._alertService.warn('Please enter all details');
    }
    
  }
  loadImageFileAsURL(event) {
    // get the file name
    this.filename = this.registerForm.value['photo'].replace(/^.*[\\\/]/, '');

    // converting to base64url
    if (this.registerForm.value['photo'].length > 0) {
      const fileToLoad = event.srcElement.files[0];
      const fileReader = new FileReader();
      fileReader.onload = (fileLoadedEvent: any) => {
        // Base64Url
        this.croppedImage = fileLoadedEvent.target.result;

      };
      fileReader.readAsDataURL(fileToLoad);
    }
  }

  uploadImage() {

    const params = {
      'blobkey': 'string',
      'fileName': this.filename,
      'imageUrl': this.croppedImage
    };
    this._registration.uploadImage(params).subscribe((res:any) => {
       // console.log('uploadimageurl',res.message);
    }, err => {
     this._alertService.success(GLOBAL_MESSAGES.ERROR_MESSAGE);
    });
  }


  selectRole(role: string) {
    if (role === 'ROLE_USER') {
      this.registerForm.patchValue({ website: 'string', carType: 'string', domain: 'string', category: 'string' });
      this.isEnable = false;
    } else {
      this.isEnable = true;
      this.registerForm.patchValue({ carType: 'Taxi',  category: 'TAXI' });
    }
  }
  searchAddress() {
    this.mapsAPILoader.load().then(
      () => {
        const autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types: ['address'] });
        // Set initial restrict to the greater list of countries.
        autocomplete.setComponentRestrictions(
          { 'country': ['in', 'ch', 'gb'] });

        autocomplete.addListener('place_changed', () => {
          this.ngZone.run(() => {
            const place: google.maps.places.PlaceResult = autocomplete.getPlace();
            this.address = place.formatted_address;
            if (place.geometry === undefined || place.geometry === null) {
              this.lat = place.geometry.location.lat();
              this.lng = place.geometry.location.lng();
              return;
            }
            this.lat = place.geometry.location.lat();
            this.lng = place.geometry.location.lng();
            this.addressArray = place.address_components;
            this.address = place.formatted_address;
            this.state = this.retriveAddressComponents('administrative_area_level_1');
          });
        });
      }
    );
  }
  retriveAddressComponents(type: any) {
    const res = this.addressArray.find(address_components => address_components.types[0] === type);
    const state = this.addressArray.find(geometry => geometry.types[0] === type);
    return state.short_name;

  }

  fileChangeEvent(file: any) {
    this.imageChangedEvent = file;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.registerForm.patchValue({ photo: this.croppedImage });
  }
  imageLoaded() {
    this.showCropper = true;
  }
  cropperReady() {
     // console.log('Cropper ready');
  }
  loadImageFailed() {
    this._alertService.error('Image failed to upload');
  }
  dataURItoBlob(dataURI) {
    const binary = atob(dataURI.split(',')[1]);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {
      type: 'image/png'
    });
  }


  gotoLogin() {
    this._router.navigate(['/login', {}]);
  }

}
