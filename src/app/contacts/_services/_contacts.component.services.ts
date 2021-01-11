import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/@core/services/http.service';

@Injectable({ providedIn: 'root' })
export class ContactsServices {
    constructor(private http: HttpService) { }
    contacts(modal) {
        return this.http.post('contactus/mail/create', modal);
    }
}
