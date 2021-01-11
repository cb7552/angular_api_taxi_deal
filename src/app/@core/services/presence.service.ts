import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { first, switchMap, tap, map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import * as firebase from 'firebase/app';
require('firebase/auth');
@Injectable({
  providedIn: 'root'
})
export class PresenceService {
  constructor(private afAuth: AngularFireAuth, private afDb: AngularFireDatabase) {
     // console.log('let there be presence');
    this.updateOnUser().subscribe();
    this.updateOnDisconnect().subscribe();
    this.updateOnAway();
  }

  getPresence(uid) {
    return this.afDb.object(`status/${uid}`).valueChanges();
  }

  getUser() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  loginUser(userId) {
    status = 'online';
    return this.afDb.object(`status/${userId}`).update({ status, timestamp: this.timestamp });
  }

  setStatusUser(userId, status) {
     // console.log(status.status);
    return this.afDb.object(`status/${userId}`).update({ status, timestamp: this.timestamp });
  }

  getStatusUser(userId) {
    return this.afDb.database
      .ref(`status/${userId}`)
      .once('value')
      .then((token) => {
        return token.val();
      })
      .then((status) => {
         // console.log(status.status);
        return status.status;
      });
  }

  logoutUser(userId) {
    status = 'offline';
    return this.afDb.object(`status/${userId}`).update({ status, timestamp: this.timestamp });
  }

  async setPresence(status: string) {
    const user = await this.getUser();
    if (user) {
      return this.afDb.object(`status/${user.uid}`).update({ status, timestamp: this.timestamp });
    }
  }

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  updateOnUser() {
    const connection = this.afDb
      .object('.info/connected')
      .valueChanges()
      .pipe(map((connected) => (connected ? 'online' : 'offline')));

    return this.afAuth.authState.pipe(
      switchMap((user) => (user ? connection : of('offline'))),
      tap((status) => this.setPresence(status))
    );
  }

  updateOnDisconnect() {
    return this.afAuth.authState.pipe(
      tap((user) => {
        if (user) {
          this.afDb
            .object(`status/${user.uid}`)
            .query.ref.onDisconnect()
            .update({
              status: 'offline',
              timestamp: this.timestamp
            });
        }
      })
    );
  }

  async signOut() {
    await this.setPresence('offline');
    await this.afAuth.auth.signOut();
  }

  updateOnAway() {
    document.addEventListener('visibilitychange', () => {
       // console.log(document.hidden);
      if (document.hidden) {
        this.setPresence('away');
      } else {
        this.setPresence('online');
      }
    });
  }
}
