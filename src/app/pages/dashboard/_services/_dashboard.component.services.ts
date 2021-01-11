import { Injectable } from '@angular/core';

import { HttpService } from '../../../@core/services/http.service';
import { DashBoardConfig } from '../_dashboard-url.config';

@Injectable({ providedIn: 'root' })
export class DashboardServices {
  constructor(private http: HttpService) { }
  getTaxiPosition(supplierId, userID) {
    return this.http.get(DashBoardConfig.EndPoint.Dashboard.TaxiPosition + supplierId + '/' + userID);
  }
  getPrice(){
    return this.http.get(DashBoardConfig.EndPoint.Dashboard.Price);
  }
  getUpdate(modal){
    return this.http.put(DashBoardConfig.EndPoint.Dashboard.updatePrice,modal);
  }
  getTotalRide(supplierId) {
    return this.http.get(DashBoardConfig.EndPoint.Dashboard.totalRide + supplierId);
  }

}
