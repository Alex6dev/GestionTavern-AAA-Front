import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KitchenMapComponent } from './kitchen-map/kitchen-map.component';
import { RestaurantMapComponent } from './restaurant-map/restaurant-map.component';
import { StoreMapComponent } from './store-map/store-map.component';
import { TerraceMapComponent } from './terrace-map/terrace-map.component';

const routes: Routes = [
  { path: 'game', redirectTo: '/game/restaurant'},
  { path: 'restaurant', component: RestaurantMapComponent },
  { path: 'cuisine', component: KitchenMapComponent },
  { path: 'terrace', component: TerraceMapComponent },
  { path: 'store', component: StoreMapComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameRoutingModule {}
