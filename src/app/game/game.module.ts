import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { KitchenMapComponent } from './kitchen-map/kitchen-map.component';
import { RestaurantMapComponent } from './restaurant-map/restaurant-map.component';
import { TerraceMapComponent } from './terrace-map/terrace-map.component';
import { StoreMapComponent } from './store-map/store-map.component';

@NgModule({
  declarations: [
    KitchenMapComponent,
    RestaurantMapComponent,
    TerraceMapComponent,
    StoreMapComponent,
  ],
  imports: [CommonModule, GameRoutingModule],
})
export class GameModule {}
