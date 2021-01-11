import { Injectable } from '@angular/core';

import { HttpService } from '../../../@core/services/http.service';
import { OnlineOfflineConfig } from '../_online-offline-url.config';


@Injectable({ providedIn: 'root' })
export class OnlineOfflineServices {
    constructor(private http: HttpService) { }
    getTaxiPositionData(supplierId, userId) {
        return this.http.get(OnlineOfflineConfig.EndPoint.OnlineOffline.TaxiPositionData + supplierId + '/' + userId);
    }
}
