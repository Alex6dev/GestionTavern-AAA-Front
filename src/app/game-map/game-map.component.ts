import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-game-map',
  templateUrl: './game-map.component.html',
  styleUrls: ['./game-map.component.css']
})
export class GameMapComponent implements OnInit {
  pageCurrent:string=""

  constructor(private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    
  }
  ngAfterViewInit():void{
     this.pageCurrent=this.route.children[0].snapshot.routeConfig?.path!;
    this.displayActive();
  }

  displayActive():void{
    document.getElementsByClassName("active")[0]?.classList.remove("active");
    switch(this.pageCurrent){ 
      case "restaurant":
        document.getElementById("restaurant")?.classList.add("active");
        break;
      case "store":
        document.getElementById("shop")?.classList.add("active");
        break;
      case "cuisine":
        document.getElementById("cuisine")?.classList.add("active");
        break;
      case "terrace":
        document.getElementById("terrasse")?.classList.add("active");
        break;
    }
  }
  displaySalleBox():void{
    
    const boxSalle=document.getElementById('boxSalle');

    if(boxSalle){
      boxSalle.classList.contains("d-none")? (
        boxSalle.classList.remove('d-none'),
        boxSalle.classList.add("d-block")
      ):(
        boxSalle.classList.remove("d-block"),
        boxSalle.classList.add("d-none")
      )
    }
  }

  clickUrl(url : string):void{
    this.pageCurrent=url;
    this.displayActive();
    this.router.navigateByUrl('/game/'+url);
  }

}
