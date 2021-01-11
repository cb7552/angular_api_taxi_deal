import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/takeWhile';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PresenceService } from 'src/app/@core/services/presence.service';

import { MapsAPILoader } from '@agm/core';
import { DatePipe } from '@angular/common';
import { Component, NgZone, OnInit } from '@angular/core';
import {
    AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument
} from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

import { AlertService } from '../@core/services/alert.service';
import { AuthService } from '../@core/services/auth.service';

// tslint:disable-next-line:class-name
interface point { lat: number; lng: number; imageUrl: string; name: string; cartype: string; phoneNumber: string; driverStatus: string; }

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {
  private itemsCollection: AngularFirestoreCollection<any>;
  items: Observable<any[]>;
  itemsDoc: AngularFirestoreDocument<any>;
  // google maps zoom level
  zoom = 16;
  FirebaseData: any;
  // initial center position for the map

  currentPos: point = {
    lat: 50.082730,
    lng: 14.431697,
    imageUrl: '../../assets/img/type/taxi-cab.png',
    name: 'Taxi',
    cartype: 'Taxi',
    phoneNumber: '123456789',
    driverStatus: 'Online'
  };


  points: point[] = [];
  tmpPoints: point[] = this.FirebaseData;
  driverInfo: string;
  timeInfo: string;
  constructor(
    private _mapsApiLoader: MapsAPILoader,
    private _ngZone: NgZone,
    private _fireStore: AngularFirestore,
    private _presenceService: PresenceService,
    private _router: Router,
    private _alertService: AlertService,
    private _authService: AuthService,
    private _route: ActivatedRoute,
    private _datePipe: DatePipe
  ) {
  }
  ngOnInit() {
    this.driverInfo = this._route.snapshot.params['driverinfo'];
    this.timeInfo = this._route.snapshot.params['timeinfo'];
    this.onlineTaxi();
  }
  onlineTaxi(lat?, lng?) {
    let i;
    if (!lat) {
      // this.item = this.itemDoc.valueChanges();
      this.itemsCollection = this._fireStore.collection<any>('DRIVER_STATUS');
      // this.items = this.itemsCollection.valueChanges();
      this.items = this.itemsCollection.snapshotChanges().pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };

      }))
      );

      this.items.subscribe((res: any) => {
        this.FirebaseData = res;
        const i = 0;
        res.forEach((e, idx) => {
          if (e.LOCATION) {
            const arr = e.LOCATION.split(',');
            const latVal = parseFloat(arr[0]);
            e.lat = latVal + lat;
            if (idx === 0) {
            }
            const lngVal = parseFloat(arr[1]);
            e.lng = lngVal + lng;
            e.LOCATION = e.lat + ',' + e.lng;
            // tslint:disable-next-line:radix
            const driverId = parseInt(e.id);
            const TimeStamp = e.LAST_LOGIN;
            const onlineData = {
              lat: parseFloat(arr[0]),
              lng: parseFloat(arr[1]),
              id: driverId,
              TimeStamp: new Date(TimeStamp.seconds * 1000),
              imageUrl: '../../assets/img/type/taxi-cab.png',
              name: 'Taxi',
              cartype: 'Taxi',
              phoneNumber: '123456789',
              driverStatus: 'Online'
            };
            const fireBaseLocation = this.FirebaseData.filter(value => value.id === this.driverInfo);
            const previousTime = new Date().getTime();
            const PreviousTimeZone = (new Date().getTimezoneOffset() * 60000);
            // tslint:disable-next-line:radix
            const currentTime = new Date(parseInt(this.timeInfo)).getTime() + 1 * 60 * 60 * 1000;
            // tslint:disable-next-line:radix
            const currentTimeZone = (new Date(parseInt(this.timeInfo)).getTimezoneOffset() * 60000);
            if (new Date(previousTime) < new Date(currentTime + currentTimeZone)) {
              // tslint:disable-next-line:radix
              if (onlineData.id === parseInt(this.driverInfo)) {
                this.points.push(onlineData);
                this.currentPos = onlineData;
              }
            } else {
              this._alertService.warn('Your token is expired on current date and time');
            }
          }
        });


      });
    } else {
      this.itemsCollection = this._fireStore.collection<any>('DRIVER_STATUS');
      this.items = this.itemsCollection.snapshotChanges().pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        this.FirebaseData = data;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
      );

      this.items.subscribe((res: any) => {
        res.forEach(e => {
          if (e.LOCATION) {
            e.lat = parseFloat(e.LOCATION.split(',')[0]);
            e.lng = parseFloat(e.LOCATION.split(',')[1]);
          }
        });
      });
    }
  }
  private getNowUTC() {
    const now = new Date(this.timeInfo);
    return new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
  }
  mapClicked(e) {
    console.log(e);
  }
}



