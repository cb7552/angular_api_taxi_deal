import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

declare var gapi: any;

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    user$: Observable<firebase.User>;
    calendarItems: any[];

    constructor(public afAuth: AngularFireAuth) {
        this.initClient();
        this.user$ = afAuth.authState;
    }

    // Initialize the Google API client with desired scopes
    initClient() {
        gapi.load('client', () => {
            console.log('loaded client');

            // It's OK to expose these credentials, they are client safe.
            gapi.client.init({
                apiKey: 'YOUR_FIREBASE_API_KEY',
                clientId: 'YOUR_OAUTH2_CLIENTID',
                discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
                scope: 'https://www.googleapis.com/auth/calendar'
            });

            gapi.client.load('calendar', 'v3', () => console.log('loaded calendar'));

        });
    }
}
