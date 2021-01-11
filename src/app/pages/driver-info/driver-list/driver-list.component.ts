import { Component, OnInit } from '@angular/core';
import { AppUser } from '../../../@core/entities/authDataModel';
import { AuthService } from '../../../@core/services/auth.service';
import { DashboardServices } from '../../dashboard/_services/_dashboard.component.services';
import { DriverInfo } from '../_entities/_driver-info.data.model';
import { AlertService } from '../../../@core/services/alert.service';
import { GLOBAL_MESSAGES } from 'src/app/@core/entities/constants';
import { PaginationInfo } from 'src/app/@core/entities/common.entities';
import { Router } from '@angular/router';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css']
})
export class DriverListComponent implements OnInit {
  userRole: AppUser;
  myTaxis: DriverInfo[];
  reverse = false;
  totalRecords: number;
  paginationInfo: PaginationInfo = new PaginationInfo();
  previousPage: number;
  pager: any = {};
  pagedItems: any[];
  key: string;
  filterText = '';
  pageNUmber = 1;
 
  taxistatus: any[];
  taxiStatus: string;
  taxitatus: any;
 
  constructor(private _alertService: AlertService, private _authService: AuthService, private _dashboardServices: DashboardServices, private _router: Router) { }

  ngOnInit() {
    this.userRole = this._authService.getCurrentUser();
    this.key = 'name';
   this.taxiStatus = localStorage.getItem("taxistatus");
   this.getMyTaxis();
  }
  getMyTaxis() {
    if (this.userRole.data.supplierId > 0) {
      this._dashboardServices.getTaxiPosition(this.userRole.data.supplierId, this.userRole.data.userId).subscribe((res: any) => {
        if (res.data) {
          this.myTaxis = res.data;
          this.totalRecords = this.myTaxis.length ? this.myTaxis.length : 0;
          this.setPage(1);
         this.taxistatus = [];
        this.taxistatus = this.myTaxis.filter(value => value.cartype === this.taxiStatus || value.driverStatus === this.taxiStatus);
        }
      }, err => {
        this._alertService.error(GLOBAL_MESSAGES.ERROR_MESSAGE);
      });
    }
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
    this.pager = this.getPager(this.myTaxis.length, page);
    // get current page of items
    this.pagedItems = this.myTaxis.slice(this.pager.startIndex, this.pager.endIndex + 1);
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

    // if (totalPages <= 5) {
    //   startPage = 1;
    //   endPage = totalPages;
    // } else {
    //   if (currentPage <= 3) {
    //     startPage = 1;
    //     endPage = 5;
    //   } else if (currentPage + 1 >= totalPages) {
    //     startPage = totalPages - 4;
    //     endPage = totalPages;
    //   } else {
    //     startPage = currentPage - 2;
    //     endPage = currentPage + 2;
    //   }
    // }
    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    // create an array of pages to ng-repeat in the pager control
    let pages = this.myTaxis.length;
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

  
  routeTo() {
    this._router.navigate(['/pages/dashboard']);
  }

}



