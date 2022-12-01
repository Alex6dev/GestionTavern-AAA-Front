import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ManagerModel } from '../interfaces/manager';
import { LoadManagerService } from '../services/loadManager/load-manager.service';
import { ManagerService } from '../services/manager/manager.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {
  manager:ManagerModel={}as ManagerModel;
  sub:Subscription=new Subscription();
  constructor(private loadManagerService:LoadManagerService,private managerService:ManagerService) { }

  ngOnInit(): void {
    this.loadManagerService.loadManager(Number.parseInt(sessionStorage.getItem('idManager')!));
    this.sub= this.managerService.manager$.subscribe((manager)=>{
      this.manager=manager;
      this.displayJaugeMaxExp();
    })
    setTimeout(()=>document.getElementById('container')?.remove(),4000);

  } 
  displayJaugeMaxExp(){
    const jaugeExp= document.getElementById('conteneurExp');
    const exp= (this.manager.experience/this.manager.maxExp)*100;
    jaugeExp!.style.width=exp+'px';
  } 

}
