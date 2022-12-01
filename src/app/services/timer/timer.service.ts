import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private timersEat = new BehaviorSubject([] as any[]);
  timersEat$=this.timersEat.asObservable();
  constructor() { }
  setTimersEat(newTimersEat: any[]) {
    this.timersEat.next(newTimersEat); 
  }
  addTimerEat(newTimerEat:any){
    let newTab:any[]=Array.from(this.timersEat.getValue());
    newTab.push(newTimerEat);
    this.timersEat.next(newTab);
  }
}
