import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/@core/services/http.service';
import { appInitializerFactory } from '@angular/platform-browser/src/browser/server-transition';

@Injectable({ providedIn: 'root' })
export class SearchServices {
    resultData: any;
    constructor(private http: HttpService) { }
    getSearchResult(modal) {
         // return this.http.post('taxi/v1/search/auto/ByGeoLocation', modal);
         return this.http.post('taxi/v1/search/web/auto/Map/ByGeoLocation', modal);
    }
    uploadImage() {
    }
    getTaxiDetails(taxiId, driverId) {
        return this.http.get('taxi/v1/detailview/' + taxiId + '/' + driverId);
    }
    getTaxiDetail(taxiId, taxiName) {
        return this.http.get('taxi/v1/detailview/' + taxiId + '/' + taxiName);
    }
    getTaxiDetailS(taxiId, taxiName) {
        return this.http.get('taxi/v1/detailviews/' + taxiId + '/' + taxiName);
    }
    getReview(taxiDetailId) {
        return this.http.get('review/v1/ByTaxiDetailId/' + taxiDetailId);
    }
    postContactForm(data) {
        return this.http.post('contactus/mail/create', data);
    }

    setResultData(result) {
        return this.resultData = result;
    }
    postReview(modal) {
        return this.http.post('review/v1/create', modal);
    }
    getCategoryTypeAll() {
        return this.http.get('VehicleType/getAll');
    }
    getFarResult(modal) {
        return this.http.post('ride/v1/PriceCalculation/gps/', modal);
    }
    getPrice(taxiId) {
        return this.http.get('price/v1/taxi/' + taxiId);
    }
}
