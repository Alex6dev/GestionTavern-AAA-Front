import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  IngredientModel,
  IngredientQuantity,
  ShopIngredientDto,
  ShopIngredientQuantity,
} from 'src/app/interfaces/ingredient';
import { IngredientsService } from 'src/app/services/ingredients/ingredients.service';
import { InventoryManagerService } from 'src/app/services/inventoryManager/inventory-manager.service';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-store-map',
  templateUrl: './store-map.component.html',
  styleUrls: ['./store-map.component.css'],
})
export class StoreMapComponent implements OnInit {
  ingredients: IngredientModel[] = [];
  inventory: IngredientQuantity[] = [];
  cartSelling: IngredientQuantity[] = [];
  cartBuying: IngredientQuantity[] = [];

  totalBuyingPrice: number = 0;
  totalSellingPrice: number = 0;

  shopIngredientDtoToSelling = {} as ShopIngredientDto;
  shopIngredientDtoToBuying = {} as ShopIngredientDto;

  sub1: Subscription = new Subscription();
  sub2: Subscription = new Subscription();

  constructor(
    private ingredientsService: IngredientsService,
    private inventoryManagerService: InventoryManagerService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.sub1 = this.ingredientsService.ingredients$.subscribe((ingredient) => {
      this.ingredients = ingredient;
      this.sub2 = this.inventoryManagerService.inventaireConnect$.subscribe(
        (inventory) => {
          this.inventory = inventory;
        }
      );
    });
  }
  ngOnDestroy(): void {
    this.sub1.unsubscribe;
    this.sub2.unsubscribe;
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
    this.shopIngredientDtoToBuying.idManager = parseInt(
      sessionStorage.getItem('idManager')!
    );
    this.shopIngredientDtoToBuying.shopIngredientQuantity = [];
    this.cartBuying.forEach((element) => {
      if (element.quantity != undefined) {
        const shopIngredientQuantity = {} as ShopIngredientQuantity;
        shopIngredientQuantity.idIngredient = element.id;
        shopIngredientQuantity.quantity = element.quantity;
        this.shopIngredientDtoToBuying.shopIngredientQuantity.push(
          shopIngredientQuantity
        );
      }
    });
    //envoie du post avec comme argument this.shopIngredientDtoToBuying
    this.storeService
      .buyIngredients(this.shopIngredientDtoToBuying)
      .subscribe((inventory) => {
        if (this.storeService.isInventory(inventory)) {
          this.inventory = inventory;
          this.cartBuying = [];
          this.totalBuyingPrice = 0;
        } else {
          //erreur venant du back
        }
      });
  }
  private sellingRequest() {
    this.shopIngredientDtoToSelling.idManager = parseInt(
      sessionStorage.getItem('idManager')!
    );
    this.shopIngredientDtoToSelling.shopIngredientQuantity = [];
    this.cartSelling.forEach((element) => {
      if (element.quantity != undefined) {
        const shopIngredientQuantity = {} as ShopIngredientQuantity;
        shopIngredientQuantity.idIngredient = element.id;
        shopIngredientQuantity.quantity = element.quantity;
        this.shopIngredientDtoToSelling.shopIngredientQuantity.push(
          shopIngredientQuantity
        );
      }
    });
    //envoie du post avec comme argument this.shopIngredientDtoToSelling
    this.storeService
      .sellIngredients(this.shopIngredientDtoToSelling)
      .subscribe((inventory) => {
        if (this.storeService.isInventory(inventory)) {
          this.inventory = inventory;
          this.totalSellingPrice = 0;
          this.cartSelling = [];
        } else {
          //erreur venant du back
        }
      });
  }
  private sellingAndBuyingRequest() {
    this.shopIngredientDtoToSelling.idManager = parseInt(
      sessionStorage.getItem('idManager')!
    );
    this.shopIngredientDtoToSelling.shopIngredientQuantity = [];
    let stopTransaction = false;

    this.cartSelling.forEach((element) => {
      if (element.quantity != undefined) {
        const shopIngredientQuantity = {} as ShopIngredientQuantity;
        shopIngredientQuantity.idIngredient = element.id;
        shopIngredientQuantity.quantity = element.quantity;
        this.shopIngredientDtoToSelling.shopIngredientQuantity.push(
          shopIngredientQuantity
        );
      }
    });
    //envoie du post avec comme argument this.shopIngredientDtoToSelling
    this.storeService
      .sellIngredients(this.shopIngredientDtoToSelling)
      .subscribe((inventory) => {
        if (this.storeService.isInventory(inventory)) {
          this.inventory = inventory;
          this.totalSellingPrice = 0;
          this.cartSelling = [];
        } else {
          stopTransaction = true;
          //erreur venant du back
        }
        if (!stopTransaction) {
          this.shopIngredientDtoToBuying.idManager = parseInt(
            sessionStorage.getItem('idManager')!
          );
          this.shopIngredientDtoToBuying.shopIngredientQuantity = [];

          this.cartBuying.forEach((element) => {
            if (element.quantity != undefined) {
              const shopIngredientQuantity = {} as ShopIngredientQuantity;
              shopIngredientQuantity.idIngredient = element.id;
              shopIngredientQuantity.quantity = element.quantity;
              this.shopIngredientDtoToBuying.shopIngredientQuantity.push(
                shopIngredientQuantity
              );
            }
          });
          //envoie du post avec comme argument this.shopIngredientDtoToBuying
          this.storeService
            .buyIngredients(this.shopIngredientDtoToBuying)
            .subscribe((inventory) => {
              if (this.storeService.isInventory(inventory)) {
                this.inventory = inventory;
                this.cartBuying = [];
                this.totalBuyingPrice = 0;
              } else {
                //erreur venant du back
              }
            });
        }
      });
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
