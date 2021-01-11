import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/@core/services/http.service';

@Injectable({ providedIn: 'root' })
export class RideCalculationServices {
    constructor(private http: HttpService) { }
    getFarResult(modal) {
        return this.http.post('ride/v1/PriceCalculation/gps/', modal);
    }

}
