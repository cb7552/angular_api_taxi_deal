import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EventsService {
  listeners;
  eventsSubject;
  events;
  constructor() {
    this.listeners = {};
    this.eventsSubject = new Subject();
    // this.events = this.eventsSubject.from(this.eventsSubject);
    this.eventsSubject.subscribe(({ name, args }) => {
      if (this.listeners[name]) {
        for (let listener of this.listeners[name]) {
          listener(...args);
        }
      }
    });
  }

  on(name, listener) {
    if (!this.listeners[name]) {
      this.listeners[name] = [];
    }

    this.listeners[name].push(listener);
  }

  broadcast(name, ...args) {
    this.eventsSubject.next({
      name,
      args
    });
  }
}
