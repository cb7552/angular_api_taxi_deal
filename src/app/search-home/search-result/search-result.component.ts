import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { SearchServices } from '../_services/search.component.services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../../@core/services/alert.service';
import { GLOBAL_MESSAGES } from '../../@core/entities/constants';
import { DataStoreService } from 'src/app/@core/services';
import { TranslateService } from '@ngx-translate/core';
declare var $: any;
@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  taxiId: number;
  driverId: number;
  taxiInfo;
  reviews = [];
  contactForm: FormGroup;
  // tslint:disable-next-line:max-line-length
  constructor(private translate: TranslateService,
    private _storeService: DataStoreService,
    private _alertService: AlertService,
    private _formBuilder: FormBuilder,
    private _searchService: SearchServices,
    private _route: ActivatedRoute,
    private router: Router,
    private _sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.taxiId = this._route.snapshot.params['id'];
    this.driverId = this._route.snapshot.params['driverId'];
    this.formInitilize();
    this.getTaxiInfo();
    this._storeService.currentStore.subscribe((value) => {
      if (value['language'] === 'es' || value['language'] === 'fr' || value['language'] === 'gr' || value['language'] === 'it') {
        this.translate.use(value['language']);
      } else {
        this.translate.use('en');
      }
    });
  }
  get f() { return this.contactForm.controls; }
  formInitilize() {
    this.contactForm = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^(?:\d{10}|\w+@\w+\.\w{2,3})$/)])],
      phonenumber: ['', Validators.required, Validators.minLength(10 - 12)],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }
  goHome() {
    const param = localStorage.getItem('searchcriteria');
    this.router.navigate(['/search-home/search-taxi/' + param]);
    // this.router.navigate(['/search-home']);
  }
  getTaxiInfo() {
    this._searchService.getTaxiDetails(this.taxiId, this.driverId).subscribe((r: any) => {
      this.taxiInfo = r.data;
      this.getComment(this.taxiInfo.id);
      // this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl(this.taxiInfo.imageUrl);
    }, err => {
    });
  }
  getComment(taxiDetailId) {
    this._searchService.getReview(taxiDetailId).subscribe((res: any) => {
      this.reviews = res.data;
    }, err => {
       // console.log(err);
    });
  }
  submitContactForm() {
    if (this.contactForm.valid) {
      const data = {
        email: this.contactForm.controls['email'].value,
        senderMail: 'taxideals.ch@gmail.com',
        subject: this.contactForm.controls['subject'].value,
        phonenumber: this.contactForm.controls['phonenumber'].value,
        name: this.contactForm.controls['name'].value,
        message: this.contactForm.controls['message'].value
      };

      this._searchService.postContactForm(data).subscribe((res: any) => {
        this._alertService.success(res.data);
        this.contactForm.reset();
        this.formInitilize();
      }, err => {
         // console.log(err);
        this._alertService.error(GLOBAL_MESSAGES.ERROR_MESSAGE);
      });
    }
  }

}
