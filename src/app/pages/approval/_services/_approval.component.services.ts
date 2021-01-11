import { Injectable } from '@angular/core';

import { HttpService } from '../../../@core/services/http.service';
import { ApprovalConfig } from '../_approval-url.config';


@Injectable({ providedIn: 'root' })
export class ApprovalServices {
    constructor(private http: HttpService) { }
    taxiApproves(supId, userId) {
        if (supId === 0 || supId === '0') {
            return this.http.get(ApprovalConfig.EndPoint.Approval.GetnonApproval + userId);
        } else {
            return this.http.get(ApprovalConfig.EndPoint.Approval.Approval + supId + '/' + userId);
        }
    }
    getApproved(id, userId) {
        return this.http.get(ApprovalConfig.EndPoint.Approval.UpdateApproval + id + '/' + userId);
    }
    getTaxiDetails(taxiId) {
        return this.http.get(ApprovalConfig.EndPoint.Approval.GetApprovalDetails + taxiId);
    }
    updateVehicleInfo(data) {
        return this.http.post(ApprovalConfig.EndPoint.Approval.UpdateVehicleDetails, data);
    }


}
