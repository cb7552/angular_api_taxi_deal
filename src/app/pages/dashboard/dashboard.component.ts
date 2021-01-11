import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/@core/services/alert.service';

import { AuthService, DataStoreService } from 'src/app/@core/services';
import { AppUser } from '../../@core/entities/authDataModel';
import { DashboardServices } from './_services/_dashboard.component.services';
import { OfflineDriverInfo } from './_entites/_dashboard.models';
import { GLOBAL_MESSAGES } from '../../@core/entities/constants';
import * as Highcharts from 'highcharts';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

declare var require: any;
require('highcharts/modules/funnel')(Highcharts);
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  chart: any;
  userRole: AppUser;
  offlineDatas: OfflineDriverInfo[];
  showMyTaxisChart: boolean;
  taxiStatus = [];
  transportStatus = [];
  taxi6Status = [];
  taxi4Status = [];
  autoStatus = [];
  chartInfo: any;
  tripInfo: any;
  activeTab = 'details';
  taxi4status: any[];
  taxistatus: any;
  offDutyDrivers = [];
  onDutyDrivers = [];
  prices: any;
  isEdit: boolean;
  public filterText = '';
  priceDetails: any;
  isEditPrice: boolean;
  PriceId: any;
  response: [];
  Prices: any;
  constructor(private _alertService: AlertService,
    private _dashboardServices: DashboardServices,
    private _authService: AuthService,
    private _route: Router,
    private translate: TranslateService,
    private _storeService: DataStoreService) { }

  ngOnInit() {
    this.userRole = this._authService.getCurrentUser();
    this.getMyTaxis();
    setTimeout(() => {
      this.tripChart();
    }, 800);
    this._storeService.currentStore.subscribe((value) => {
      if (value['language'] === 'es' || value['language'] === 'fr' || value['language'] === 'gr' || value['language'] === 'it') {
        this.translate.use(value['language']);
      } else {
        this.translate.use('en');
      }
    });
    this.getRide();
  }
  reload() {
    this.getMyTaxis();
  }
  getMyTaxis() {
    if (this.userRole.data.supplierId > 0) {
      this._dashboardServices.getTaxiPosition(this.userRole.data.supplierId, this.userRole.data.userId).subscribe((res: any) => {
        if (res.data) {
          this.offlineDatas = res.data;
          this.taxiStatus = this.offlineDatas.filter(value => value.cartype === 'Taxi' || value.cartype === 'Mini/Hatchback (Seats 4+1)');
          // tslint:disable-next-line:max-line-length
          this.transportStatus = this.offlineDatas.filter(value => value.cartype === 'Transport' || value.cartype === 'Tempo Traveller (Seats 12+1)');
          // tslint:disable-next-line:max-line-length
          this.taxi6Status = this.offlineDatas.filter(value => value.cartype === 'Taxi6' || value.cartype === 'SUV-Tavara (Seats 7+1)' || value.cartype === 'SUV-Innova (Seats 7+1)');
          this.taxi4Status = this.offlineDatas.filter(value => value.cartype === 'Taxi4' || value.cartype === 'Seadan (Seats 4+1)');
          this.autoStatus = this.offlineDatas.filter(value => value.cartype === 'Auto');
          this.onDutyDrivers = this.offlineDatas.filter(value => value.driverStatus === 'WAITING');
          this.offDutyDrivers = this.offlineDatas.filter(value => value.driverStatus === 'START' ||  value.driverStatus === 'STOP');
          this.showMyTaxisChart = true;
          this.isEdit = false;
          setTimeout(() => {
            this.myTaxiChart();
          }, 800);
        }
      }, err => {
        this._alertService.error(GLOBAL_MESSAGES.ERROR_MESSAGE);
      });
    }
  }
  myTaxiChart() {
    this.chartInfo = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'My Taxis'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.y:.1f}</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false
          },
          showInLegend: true
        }
      },
      credits: {
        enabled: false
      },
      series: [{
        name: '',
        colorByPoint: true,
        data: [{
          name: 'Taxi 4',
          y: this.taxi4Status.length > 0 ? this.taxi4Status.length : 0,
          sliced: true,
          selected: true
        }, {
          name: 'Auto',
          y: this.autoStatus.length > 0 ? this.autoStatus.length : 0
        },
        {
          name: 'Transport',
          y: this.transportStatus.length > 0 ? this.transportStatus.length : 0
        },
        {
          name: 'Taxi 6',
          y: this.taxi6Status.length > 0 ? this.taxi6Status.length : 0
        },
        {
          name: 'Taxi',
          y: this.taxiStatus.length > 0 ? this.taxiStatus.length : 0
        }]
      }]
    };
    this.chart = Highcharts.chart('mytaxichart', this.chartInfo);
  }
  tripChart() {
    this.tripInfo = {
      chart: {
        type: 'spline'
      },
      title: {
        text: 'Monthly Average trips'
      },
      subtitle: {
        text: ' '
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      yAxis: {
        title: {
          text: 'Income'
        },
        labels: {
          formatter: function () {
            return this.value + '$';
          }
        }
      },
      tooltip: {
        crosshairs: true,
        shared: true
      },
      plotOptions: {
        spline: {
          marker: {
            radius: 4,
            lineColor: '#666666',
            lineWidth: 1
          }
        }
      },
      credits: {
        enabled: false
      },
      series: [{
        name: '2018',
        marker: {
          symbol: 'square'
        },
        data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 23.3, 18.3, 13.9, 9.6]

      }, {
        name: '2019',
        marker: {
          symbol: 'diamond'
        },
        data: [4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
      }]
    };
    this.chart = Highcharts.chart('tripchart', this.tripInfo);
  }
  result(activeTab : string){
    this.activeTab = activeTab;
  }
  routeTo(pageName: string) {
    if (pageName === 'DRIVERSTATUS') {
      this._route.navigate(['/pages/driver-info/driver-status']);
    } else if (pageName === 'DRIVERLIST') {
      this._route.navigate(['/pages/driver-info/driver-list']);
    } else if (pageName === 'ADDDRIVER') {
      this._route.navigate(['/pages/driver-info/add-new-driver']);
    }
  }

  getTaxi() {
    this.taxistatus = "Taxi";
    localStorage.setItem('taxistatus', this.taxistatus);
    this._route.navigate(['/pages/driver-info/driver-list' ]);
  }

  getTaxi4() {
    this.taxistatus = "Taxi4";
    localStorage.setItem('taxistatus', this.taxistatus);
    this._route.navigate(['/pages/driver-info/driver-list' ]);
  }
  getTaxi6() {
    this.taxistatus = "Taxi6";
    localStorage.setItem('taxistatus', this.taxistatus);
    this._route.navigate(['/pages/driver-info/driver-list' ]);
  }
  getAuto() {
    this.taxistatus = "Auto";
    localStorage.setItem('taxistatus', this.taxistatus);
    this._route.navigate(['/pages/driver-info/driver-list' ]);
  }
  getTransport() {
    this.taxistatus = "Transport";
    localStorage.setItem('taxistatus', this.taxistatus);
    this._route.navigate(['/pages/driver-info/driver-list' ]);
  }
getonline() {
  this.taxistatus = "WAITING";
  localStorage.setItem('taxistatus', this.taxistatus);
  this._route.navigate(['/pages/driver-info/driver-list' ]);
}

getoffline() {
    this.taxistatus = "STOP";
    localStorage.setItem('taxistatus', this.taxistatus);
     // console.log("taxiStatus ---", this.taxistatus);
    this._route.navigate(['/pages/driver-info/driver-list' ]); 
}
  price(){
    this._dashboardServices.getPrice().subscribe((res: any) => {
      this.prices = res.data;
      this.isEdit = true;
      this.isEditPrice = false;
    });
  }
  show(id){
    this.PriceId = id;
     // console.log("Price id0", id);
  }
  editPrice() {
    
      const inputRequest = {
          basePrice: 0,
          cancellation: 0,
          category: "string",
          domain: "string",
          id: this.PriceId,
          km: 0,
          minimumPrice: 0,
          peakPrice: 0,
          percentage: 0,
          price: 0,
          region: "string",
          tax: 0,
          type: "string",
          waitingTime: 0,
          zipCode: 0
        
      };
    
    this._dashboardServices.getUpdate(inputRequest).subscribe(
      (res: any) => {
        if (res.data) {
          this.priceDetails = res.data;

          this.isEdit = false;
          this.isEditPrice = true;
        }
      },
      (err) => {
        this._alertService.error(GLOBAL_MESSAGES.ERROR_MESSAGE);
      }
    );
  }
  getRide() {
    this._dashboardServices.getTotalRide(this.userRole.data.supplierId).subscribe((res: any) => {
      console.log("price", res);
      this.response = res.data;
       this.Prices  = res.data;
      
  });
}
}
