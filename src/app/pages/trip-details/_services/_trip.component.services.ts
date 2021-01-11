import { Injectable } from '@angular/core';

import { HttpService } from '../../../@core/services/http.service';

@Injectable({ providedIn: 'root' })
export class TripServices {
    currentUrl: string;
    constructor(private http: HttpService) { }

    getTrips(modal) {
        if (modal.roleId === 'ROLE_DRIVER') {
            this.currentUrl = 'ride/v1/driver/get/' + modal.userId;
        } else if (modal.roleId === 'ROLE_USER') {
            this.currentUrl = 'ride/v1/user/get/' + modal.userId;
        } else {
            this.currentUrl = 'ride/v1/supplier/get/' + modal.supplierId;
        }
        return this.http.get(this.currentUrl);
    }
    getSupplier(supplierId) {
        return this.http.get('phoneBooking/v1/allBookings/' + supplierId);
    }

    getinvoice(rideId){
        return this.http.get('ride/v1/invoice/' + rideId);
    }
}
