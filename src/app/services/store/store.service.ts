import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IngredientQuantity,
  ShopIngredientDto,
} from 'src/app/interfaces/ingredient';
import {ManagerModel}  from '../../interfaces/manager';
import { environment } from 'src/environments/environment';
import { InventoryManagerService } from '../inventoryManager/inventory-manager.service';
import { ManagerService } from '../manager/manager.service';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private urlShopSell = environment.apiUrl + 'api/game/shop/ShopSelling';
  private urlShopBuy = environment.apiUrl + 'api/game/shop/ShopBying';
  constructor(private http: HttpClient, private inventoryManagerService: InventoryManagerService, private managerService:ManagerService) {}

  sellIngredients(
    listSellIngredients: IngredientQuantity[]
  ): Observable<boolean> {
    let listSellIngredientsDto:ShopIngredientDto= {} as ShopIngredientDto;
    listSellIngredientsDto.idManager=parseInt(sessionStorage.getItem('idManager')!);
    listSellIngredientsDto.shopIngredientQuantity=[];

    for (let i = 0; i < listSellIngredients.length; i++) {
      const ingredientCurrent = listSellIngredients[i];
      listSellIngredientsDto.shopIngredientQuantity.push({idIngredient: ingredientCurrent.id,
        quantity: ingredientCurrent.quantity!})
    }

    return new Observable<boolean>(subscriber=>{
      this.http.post<ManagerModel>(
        this.urlShopSell,
        listSellIngredientsDto
      ).subscribe((managerModel)=>{
        this.inventoryManagerService.setInventaire(managerModel.ingredientQuantity);
        this.managerService.setManager(managerModel);
        subscriber.next(true);
      });

    }) 
  }

  buyIngredients(listBuyIngredients:IngredientQuantity[] ):Observable<boolean>{

    let listBuyIngredientsDto:ShopIngredientDto= {} as ShopIngredientDto;
    listBuyIngredientsDto.idManager=parseInt(sessionStorage.getItem('idManager')!);
    listBuyIngredientsDto.shopIngredientQuantity=[];

    listBuyIngredients.forEach(ingredientCurrent=>{
      listBuyIngredientsDto.shopIngredientQuantity.push({idIngredient: ingredientCurrent.id,
        quantity: ingredientCurrent.quantity!})
    });
    
    return new Observable<boolean>(subscriber=>{
      this.http.post<ManagerModel>(
        this.urlShopBuy,
        listBuyIngredientsDto
      ).subscribe((managerModel)=>{
        this.inventoryManagerService.setInventaire(managerModel.ingredientQuantity);
        this.managerService.setManager(managerModel);
        subscriber.next(true);
      });

    }) 
  }

}
