import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/@core/services/http.service';

@Injectable({ providedIn: 'root' })
export class ContactServices {
    constructor(private http: HttpService) { }
    contacts() {
        return this.http.post('contactus/mail/getAll');
    }
    contact(supplierId) {
        return this.http.post('contactus/mail/' + supplierId);
    }
}