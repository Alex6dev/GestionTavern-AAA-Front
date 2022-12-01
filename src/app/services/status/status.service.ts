import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Status } from 'src/app/interfaces/status';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  private notification = new Subject<Status>();
  notificationEnvoye$ = this.notification.asObservable();

  constructor() {}

  envoyerStatus(status: Status) {
    this.notification.next(status);
  }
}
