import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactsServices } from './_services/_contacts.component.services';
import { AlertService } from '../@core/services/alert.service';
import { GLOBAL_MESSAGES } from '../@core/entities/constants';
import { ContactInfo } from './_entities/contact.data.model';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contactForm: FormGroup;
  submitted: boolean;
  addContacts = new ContactInfo();
  constructor(private _formBuilder: FormBuilder, private _contacts: ContactsServices, private _alertService: AlertService) { }

  ngOnInit() {
    this.formInitilize();
  }
  formInitilize() {
    this.contactForm = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^(?:\d{10}|\w+@\w+\.\w{2,3})$/)])],
      phonenumber: ['', Validators.required],
      message: ['', Validators.required],
      subject: ['', Validators.required],
      job: ['', Validators.required]
    });
  }
  get f() { return this.contactForm.controls; }
 

  saveContactForm(formValue) {
    let d = new Date();
    const inputRequest = {
      carType: 'string',
      destination: 'string',
      email: formValue.email,
      endDate: d,
      id: 0,
      message: formValue.message,
      name: formValue.name,
      phonenumber: formValue.phonenumber,
      senderMail: 'taxideals.ch@gmail.com',
      source: 'string',
      startDate: d,
      subject: formValue.subject,
      taxiId: 0
     
    };
    this._contacts.contacts(inputRequest).subscribe(
      (res: any) => {
        if (res.status) {
          this._alertService.success(res.data);
          this.formRest();
        }
      },
      (err) => {
        this._alertService.error(GLOBAL_MESSAGES.ERROR_MESSAGE);
      }
    );
  }
  formRest() {
    this.contactForm.reset();
    this.formInitilize();
  }

}
