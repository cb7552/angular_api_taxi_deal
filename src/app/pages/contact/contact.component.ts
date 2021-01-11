import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactServices } from './_services/_contact.component.services';
import { AlertService } from '../../@core/services/alert.service';
import { GLOBAL_MESSAGES } from '../../@core/entities/constants';
import { AppUser } from '../../@core/entities/authDataModel';
import { AuthService, DataStoreService } from 'src/app/@core/services';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  contact: any;
  userRole: AppUser;
  filterText: string;
  constructor(private _formBuilder: FormBuilder,
    private _contacts: ContactServices,
    private _alertService: AlertService,
    private _authService: AuthService) { }

  ngOnInit() {
    this.userRole = this._authService.getCurrentUser();
    this.saveContactForm();
  }

  saveContactForm() {
    this._contacts.contact(this.userRole.data.supplierId).subscribe(
      (res: any) => {
        this.contact = res.data;
         // console.log('Contaxts--', this.contact);
      }
    );
  }
}
