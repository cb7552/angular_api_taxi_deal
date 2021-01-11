import { Component, OnInit } from '@angular/core';

import { AppUser } from '../../../@core/entities/authDataModel';
import { AuthService } from '../../../@core/services/auth.service';
import { TripServices } from '../_services/_trip.component.services';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DataStoreService } from 'src/app/@core/services';
import { PaginationInfo } from 'src/app/@core/entities/common.entities';

@Component({
  selector: 'app-trip-history',
  templateUrl: './trip-history.component.html',
  styleUrls: ['./trip-history.component.css']
})
export class TripHistoryComponent implements OnInit {
  userRole: AppUser;
  onlineDetails = [];
  isEdit = true;
  offlineDetails = [];
  isShow = false;
  paginationInfo: PaginationInfo = new PaginationInfo();
  previousPage: number;
  pager: any = {};
  pagedItems: any[];
  key: string;
  filterText = '';
  pageNUmber = 1;
  totalRecords: number;
  reverse: boolean;
  p: any;

  constructor(private translate: TranslateService,
    private _storeService: DataStoreService,
    private _router: Router, private _tripServices: TripServices, private _authService: AuthService) { }

  ngOnInit() {
    this.userRole = this._authService.getCurrentUser();
    this.getOnlineDetails();
    if (this.userRole.data.role === 'ROLE_SUPPLIER') {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
    this._storeService.currentStore.subscribe((value) => {
      if (value['language'] === 'es' || value['language'] === 'fr' || value['language'] === 'gr' || value['language'] === 'it') {
        this.translate.use(value['language']);
      } else {
        this.translate.use('en');
      }
    });
  }
  getOnlineDetails() {
    const inputRequest = {
      roleId: this.userRole.data.role,
      supplierId: this.userRole.data.supplierId,
      userId: this.userRole.data.userId,
    };
    this._tripServices.getTrips(inputRequest).subscribe((res: any) => {
      this.onlineDetails = res.data;
      this.totalRecords = this.onlineDetails.length ? this.onlineDetails.length : 0;
      this.isEdit = false;
    });
  }
  onShow(id) {
    this._router.navigate(['/pages/trip-details/trip-info/' + id]);
  }
  offlinetrip() {
    this._tripServices.getSupplier(this.userRole.data.supplierId).subscribe((res: any) => {
      this.offlineDetails = res.data;
      this.totalRecords = this.offlineDetails.length ? this.offlineDetails.length : 0;
          this.setPage(1);
      this.isEdit = true;
    }, err => {
       // console.log(err);
    });
}
   sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  onChanged(pageInfo: any) {
    this.paginationInfo.pageNumber = pageInfo.page;
    this.paginationInfo.pageSize = pageInfo.itemsPerPage;
    this.setPage(pageInfo.page);
  }
  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    // get pager object from service
    this.pager = this.getPager(this.onlineDetails.length, page);
    this.pager = this.getPager(this.offlineDetails.length, page);
    // get current page of items
    this.pagedItems = this.onlineDetails.slice(this.pager.startIndex, this.pager.endIndex + 1);
    this.pagedItems = this.offlineDetails.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);
    let startPage: number, endPage: number;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    // create an array of pages to ng-repeat in the pager control
    let pages = this.onlineDetails.length;
    pages = this.offlineDetails.length
    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }
}
