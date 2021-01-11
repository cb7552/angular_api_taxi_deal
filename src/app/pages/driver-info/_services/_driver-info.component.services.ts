import { Injectable } from '@angular/core';

import { HttpService } from '../../../@core/services/http.service';
import { DriverConfig } from '../_driver-info-url.config';

@Injectable({ providedIn: 'root' })
export class DriverServices {
    constructor(private http: HttpService) { }
    updateDriverInfo(modal) {
        return this.http.post(DriverConfig.EndPoint.DriverStatus.UpdateDriverInfo, modal);
    }
    getTaxiDetails(taxiId) {
        return this.http.get(DriverConfig.EndPoint.DriverStatus.GetDriverInfo + taxiId);
    }
    deleteSupplier(supplierId, userID) {
        return this.http.get(DriverConfig.EndPoint.DriverStatus.DeleteSupplier + supplierId + '/' + userID);
    }
    addDriver(modal) {
        return this.http.post(DriverConfig.EndPoint.AddNewDriver.SignUP, modal);
    }
    topup(data) {
        return this.http.post(DriverConfig.EndPoint.DriverTopUp.TopUp, data);
    }
    uploadUrl(modal) {
        return this.http.post(DriverConfig.EndPoint.AddNewDriver.imageUrl, modal);
    }
    smsSend(modal) {
        return this.http.post('phoneNumber/v1/twillo/new/sms', modal); 
    }
    otpSend(modal) {
        return this.http.post('user/twillo/v1/token', modal); 
    }
    
}
