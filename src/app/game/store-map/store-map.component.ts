import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, VirtualTimeScheduler } from 'rxjs';
import {
  IngredientModel,
  IngredientQuantity,
} from 'src/app/interfaces/ingredient';
import { IngredientsService } from 'src/app/services/ingredients/ingredients.service';
import { InventoryManagerService } from 'src/app/services/inventoryManager/inventory-manager.service';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-store-map',
  templateUrl: './store-map.component.html',
  styleUrls: ['./store-map.component.css'],
})
export class StoreMapComponent implements OnInit , OnDestroy{
  ingredients: IngredientModel[] = [];
  inventory: IngredientQuantity[] = [];
  cartSelling: IngredientQuantity[] = [];
  cartBuying: IngredientQuantity[] = [];

  totalBuyingPrice: number = 0;
  totalSellingPrice: number = 0;

  sub: Subscription = new Subscription();

  constructor(
    private ingredientsService: IngredientsService,
    private inventoryManagerService: InventoryManagerService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.sub = this.ingredientsService.ingredients$.subscribe((ingredient) => {
      this.ingredients = ingredient;
    });
    this.sub = this.inventoryManagerService.inventaireConnect$.subscribe(
      (inventory) => {
        this.inventory = inventory;
      }
    );
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe;
  }
  addIngredientToBuying(index: number) {
    let ingredient: IngredientQuantity | undefined;
    let ingredientAlreadyExist: IngredientQuantity | undefined;

    if (this.ingredients[index] != undefined) {
      ingredient = this.ingredients[index];
      ingredientAlreadyExist = this.cartBuying.find(
        (element) => element.id == ingredient?.id
      );

      if (ingredientAlreadyExist === undefined && ingredient != undefined) {
        ingredient.quantity = 1;
        this.cartBuying.push(ingredient);
      } else {
        if (ingredient != undefined && ingredient.quantity != undefined) {
          ingredient.quantity++;
        }
      }
      this.totalBuyingPrice += ingredient!.buyingPrice;
    }
  }
  addIngredientToSelling(index: number) {
    let ingredient: IngredientQuantity | undefined;
    let ingredientAlreadyExist: IngredientQuantity | undefined;
    let ingredient2: IngredientQuantity | undefined;

    if (this.ingredients[index] != undefined) {
      ingredient = this.inventory[index];
      ingredientAlreadyExist = this.cartSelling.find(
        (element) => element.id == ingredient?.id
      );

      if (ingredient != undefined && ingredient.quantity != undefined) {
        if (ingredientAlreadyExist?.quantity != undefined) {
          ingredientAlreadyExist.quantity++;
        } else {
          ingredient2 = structuredClone(ingredient);
          ingredient2.quantity = 1;
          this.cartSelling.push(ingredient2);
        }
        if (ingredient.quantity < 2) {
          this.inventory.splice(index, 1);
        } else {
          ingredient.quantity--;
        }
      }
      this.totalSellingPrice += Math.ceil(ingredient.buyingPrice / 2);
    }
  }

  removeIngredientToBuying(index: number) {
    let ingredient: IngredientQuantity | undefined;

    if (this.ingredients[index] != undefined) {
      ingredient = this.cartBuying[index];
      if (ingredient != undefined && ingredient.quantity != undefined) {
        if (ingredient.quantity <= 1) {
          this.cartBuying.splice(index, 1);
        } else {
          ingredient.quantity--;
        }
      }
      this.totalBuyingPrice -= ingredient.buyingPrice;
    }
  }

  removeIngredientToSelling(index: number) {
    let ingredient: IngredientQuantity | undefined;
    let ingredientAlreadyExist: IngredientQuantity | undefined;
    let ingredient2: IngredientQuantity | undefined;
    ingredient = this.cartSelling[index];

    if (this.ingredients[index] != undefined) {
      ingredientAlreadyExist = this.inventory.find(
        (element) => element.id == ingredient?.id
      );

      if (ingredient != undefined && ingredient.quantity != undefined) {
        if (ingredientAlreadyExist?.quantity != undefined) {
          ingredientAlreadyExist.quantity++;
        } else {
          ingredient2 = structuredClone(ingredient);
          ingredient2.quantity = 1;
          this.inventory.push(ingredient2);
        }
        if (ingredient.quantity < 2) {
          this.cartSelling.splice(index, 1);
        } else {
          ingredient.quantity--;
        }
      }
      this.totalSellingPrice -= Math.ceil(ingredient.buyingPrice / 2);
    }
  }

  private buyingRequest() {
    //send the post with the argument = this.cartBuying
    this.storeService.buyIngredients(this.cartBuying).subscribe(response=>{
      if(response){
        this.cartBuying=[];
        this.totalBuyingPrice=0;
      }
    });
  }
  private sellingRequest() {
    //send the post with the argument = this.cartSelling
    this.storeService.sellIngredients(this.cartSelling).subscribe(response=>{
      if(response){
        this.cartSelling=[];
        this.totalSellingPrice=0;
      }
    });
  }
  private sellingAndBuyingRequest() {
    this.sellingRequest();
    this.buyingRequest();
  }

  commitTransaction() {
    if (this.cartSelling.length > 0 || this.cartBuying.length > 0) {
      if (this.cartSelling.length > 0 && this.cartBuying.length > 0) {
        this.sellingAndBuyingRequest();
      } else {
        if (this.cartSelling.length > 0) {
          this.sellingRequest();
        } else {
          this.buyingRequest();
        }
      }
    }
  }
}
