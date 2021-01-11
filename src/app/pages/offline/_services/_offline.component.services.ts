import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/@core/services/http.service';
import { OfflineConfig } from '../_offline-url.config';

@Injectable({ providedIn: 'root' })
export class OfflineService {
    constructor(private http: HttpService) { }
    taxiPosition(modal) {
        return this.http.get(OfflineConfig.EndPoint.SMS.TaxiPosition + modal.supplierId + '/' + modal.userId);
    }
    createSms(modal) {
        return this.http.post(OfflineConfig.EndPoint.SMS.CreateSMS, modal);
    }
    driverTopup(modal) {
        return this.http.post(OfflineConfig.EndPoint.BookMessage.Toptp, modal);
    }
    getFarResult(modal) {
        return this.http.post('ride/v1/PriceCalculation/gps/', modal);
    }
    offlineSms(modal) {
        return this.http.post('phoneBooking/v1/userOffline/sms/create', modal);
    }
}
