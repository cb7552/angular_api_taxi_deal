import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { take } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpBackend } from '@angular/common/http';
import { NotificationsService } from 'angular2-notifications';


@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  // messaging = firebase.messaging();
  currentMessage = new BehaviorSubject(null);
  token = '';
  msgForm: any;

  constructor(
    private notificationsService: NotificationsService,
    private httpClient: HttpClient,
    private fireDatabase: AngularFireDatabase,
    private fireAuth: AngularFireAuth,
    private fireMessaging: AngularFireMessaging,
    handler: HttpBackend
  ) {
    // this.httpClient = new HttpClient(handler);
    this.fireMessaging.messaging.subscribe(
      (_msg) => {
        _msg.onMessage = _msg.onMessage.bind(_msg);
        _msg.onTokenRefresh = _msg.onTokenRefresh.bind(_msg);
      }
    );

  }

  updateToken(userId, token) {
    // we can change this function to request our backend service
    this.fireAuth.authState.pipe(take(1)).subscribe(
      () => {
        const data = {};
        data[userId] = token;
        this.fireDatabase.object('fcmTokens/').update(data);
      });
  }

  getPermission(userId) {
    this.fireMessaging.requestToken.subscribe(
      (token) => {
        this.token = token;
         // console.log('Tken 1', token);
        this.updateToken(userId, token);
      },
      (err) => {
         // console.log('Unable to get permission to notify.', err);
      });
  }

  receiveMessage() {
    this.fireMessaging.messages.subscribe(
      (payload: any) => {
         // console.log('new message received. ', payload);

        const body = payload.notification.body;

        this.notificationsService.success(payload.notification.title, body, {
          timeOut: 10000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true
        });
        this.currentMessage.next(payload);
      });
  }

  sendPushMessage(source, destination, driver, driverId, remarks) {

    this.fireDatabase.database.ref(`/fcmTokens/${driverId}`)
      .once('value')
      .then(token => {
        return token.val();
      })
      .then(userFcmToken => {
        const body =
          'Source: ' + source + ', '
          + 'Destination: ' + destination + ', '
          + 'Driver: ' + driver + ', ' +
          'Message: ' + remarks;

        const testData = {
          'notification': {
            'title': 'Driver notification',
            'body': body
          },
          'to': userFcmToken
        };
        const postData = JSON.stringify(testData);
        const headerJson = {
          'Content-Type': 'application/json',
         /* 'Authorization': 'key=AAAAdZrrkxw:APA91bHnUBzrRZ5ft4zeC8mEQNIZIGfSlPWLWdWMH3vjMI5NwkaADBnS6qV5SrcjjzdCIgoDe6jrnqdJg1kd0UDBXJOniTJUOG1BU0W1KBtYd8wrEyQrNVZJiwS4f9wBXxjIhaLCGIqu'*/
        'Authorization': 'key=AAAARWQX_KQ:APA91bG6oHkj9hOShlBr-foU3wcyCfeYprG-UmnXLET_sMvK5op9qR-WYTlUXJsRD2AKspEPXuYSBQP5IDRyLj2tuWZCyXq2FXkIgyU_pwhwA2HDhmZXzHQdCv7ht51yb6MWCVjslJP-'

        };
        const headersConfig = new HttpHeaders(headerJson);
        const url = 'https://fcm.googleapis.com/fcm/send';

        this.httpClient.post(url, postData, { headers: headersConfig }).subscribe(
          (data) => {
              // console.log(data);
          },
          (err: HttpErrorResponse) => {
             // console.log(err);
          }
        );
      });

  }
}
