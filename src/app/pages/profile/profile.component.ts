import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ProfileServices } from './_services/_profile.component.services';
import { AuthService } from '../../@core/services/auth.service';
import { AppUser } from '../../@core/entities/authDataModel';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MyProfile } from './_entities/profile.data.model';
import { AlertService } from '../../@core/services/alert.service';
import { GLOBAL_MESSAGES } from '../../@core/entities/constants';
import { TranslateService } from '@ngx-translate/core';
import { DataStoreService } from 'src/app/@core/services';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @ViewChild('search') public searchElement: ElementRef;
  @ViewChild('ngOtpInput') ngOtpInputRef: any;
  profileForm: FormGroup;
  userRole: AppUser;
  myProfile: MyProfile;
  isEdit: boolean;
  imageChangedEvent: File;
  finalImage: File;
  croppedImage: any = '';
  isEnable = false;
  filename: string;
  @ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent;
  showCropper: boolean;
  image2: string;
  website: string;
  searchAddress: string;
  lat: number;
  lng: number;
  addressArray: google.maps.GeocoderAddressComponent[];
  state: string;
  addressValue: any;
  constructor(private _alertService: AlertService,
    private _formBuilder: FormBuilder,
    private _profileService: ProfileServices,
    private _authService: AuthService,
    private translate: TranslateService,
    private _storeService: DataStoreService,
    public _driverService: ProfileServices,
    private _mapsAPILoader: MapsAPILoader,
    private _ngZone: NgZone) { }

  ngOnInit() {
    this.userRole = this._authService.getCurrentUser();
    this.formInitilize();
    this.getMyProfile();
    this.searchLocation();
    this._storeService.currentStore.subscribe((value) => {
      if (value['language'] === 'es' || value['language'] === 'fr' || value['language'] === 'gr' || value['language'] === 'it') {
        this.translate.use(value['language']);
      } else {
        this.translate.use('en');
      }
    });
  }
  formInitilize() {
    this.profileForm = this._formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      address: [''],
      phoneNumber: [''],
      website: [''],
      imageUrl: [''],
      fileName: [''],
      blobkey: [''],
      photo: ['']
    });
  }
  loadImageFileAsURL(event) {
    // get the file name
    this.filename = this.profileForm.value['photo'].replace(/^.*[\\\/]/, '');

    // converting to base64url
    if (this.profileForm.value['photo'].length > 0) {
      const fileToLoad = event.srcElement.files[0];
      const fileReader = new FileReader();
      fileReader.onload = (fileLoadedEvent: any) => {
         // console.log('>>>>>>>ed', fileLoadedEvent);
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
    this._driverService.uploadUrl(params).subscribe((res:any) => {
       // console.log('uploadimageurl',res.message);
    }, err => {
      this._alertService.success(GLOBAL_MESSAGES.ERROR_MESSAGE);
    });
  }
  getMyProfile() {
    this._profileService.getProfileDetails(this.userRole.data.userId).subscribe(
      (res: any) => {
        if (res.data) {
          this.myProfile = res.data;
          let base64 = this.myProfile.imageInfo ? this.myProfile.imageInfo.imageUrl : '';
          this.image2 = base64.replace(/data\:image\/(jpeg|jpg|png)\;base64\,/gi, '');
          localStorage.setItem("website", this.myProfile.website);
          this.website = this.myProfile.website
        }
      },
      (err) => {
        this._alertService.error(GLOBAL_MESSAGES.ERROR_MESSAGE);
      }
    );
  }
  editProfile() {
    this.isEdit = true;
    this.profileForm.patchValue(this.myProfile);
  }
  updateProfile(formInfo) {
    formInfo.address = this.searchAddress;
    const parameters = {
      address: formInfo.address,
      carType: this.myProfile.carType,
      category: 'string',
      code: this.myProfile.code,
      deviceId: 'string',
      domain:'string',
      email: formInfo.email,
      firstName: formInfo.firstName,
      hourly: 0,
      id: this.myProfile.id,
      imageInfo: {
        'blobkey' : 'string',
        'fileName': this.filename,
        'imageUrl': this.croppedImage
      },
      isSocialUser: true,
      lang: 'string',
      lastName: formInfo.lastName,
      latitude: 0,
      licenseNumber: 'string',
      loginStatus: 'string',
      longitude: 0,
      notification: 'string',
      password: this.myProfile.password,
      phoneNumber: formInfo.phoneNumber,
      phoneVerified: 'string',
      price: 0,
      push: 'string',
      restKey: 'string',
      role: this.myProfile.role,
      socialUser: true,
      status: 'string',
      website: this.website
    };
    //  // console.log(parameters);
    this._profileService.updateProfile(parameters).subscribe(
      (res) => {
        this._alertService.success(res.message);
        this.clearForm();
      },
      (err) => {
        this._alertService.error(GLOBAL_MESSAGES.ERROR_MESSAGE);
      }
    );
  }
  clearForm() {
    this.isEdit = false;
    this.getMyProfile();
    this.profileForm.reset();
    this.showCropper = false;
  }

  fileChangeEvent(file: any) {
    this.imageChangedEvent = file;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.profileForm.patchValue({ photo: this.croppedImage });
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

  searchLocation() {
    this._mapsAPILoader.load().then(
      () => {
        const autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types: ['address'] });
        // Set initial restrict to the greater list of countries.
        autocomplete.setComponentRestrictions(
          { 'country': ['in', 'ch', 'gb'] });

        autocomplete.addListener('place_changed', () => {
          this._ngZone.run(() => {
            const place: google.maps.places.PlaceResult = autocomplete.getPlace();
            this.searchAddress = place.formatted_address;
            if (place.geometry === undefined || place.geometry === null) {
              this.lat = place.geometry.location.lat();
              this.lng = place.geometry.location.lng();
              return;
            }
            this.lat = place.geometry.location.lat();
            this.lng = place.geometry.location.lng();
            this.addressArray = place.address_components;
            this.searchAddress = place.formatted_address;
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

}
