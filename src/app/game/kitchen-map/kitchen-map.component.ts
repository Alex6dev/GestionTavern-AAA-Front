import { Component, OnInit } from '@angular/core';
import { shareReplay, Subscription } from 'rxjs';
import { CustomerModel } from 'src/app/interfaces/customer';
import {
  IngredientModel,
  IngredientQuantity,
} from 'src/app/interfaces/ingredient';
import { ManagerModel } from 'src/app/interfaces/manager';
import {
  RecipeCustomerModel,
  RecipeCustomerPreparation,
  RecipeModel,
} from 'src/app/interfaces/recipe';
import { CustomerManagementService } from 'src/app/services/customerManagement/customer-management.service';
import { IngredientsService } from 'src/app/services/ingredients/ingredients.service';
import { InventoryManagerService } from 'src/app/services/inventoryManager/inventory-manager.service';
import { ManagerService } from 'src/app/services/manager/manager.service';
import { RecipeService } from 'src/app/services/recipe/recipe.service';
import { RecipeCustomerService } from 'src/app/services/recipeCustomer/recipe-customer.service';

@Component({
  selector: 'app-cuisine-map',
  templateUrl: './kitchen-map.component.html',
  styleUrls: ['./kitchen-map.component.css'],
})
export class KitchenMapComponent implements OnInit {
  sub: Subscription = new Subscription();
  customers: CustomerModel[] = [];
  ingredients: IngredientModel[] = [];
  inventory: IngredientQuantity[] = [];
  listAllRecipes: RecipeModel[] = [];
  listAllrecipeCustomerModel: RecipeCustomerModel[] = [];
  ingredientsRecipe: IngredientModel[] = [];
  listPreparedRecipe: RecipeCustomerPreparation[] = [];
  numberNothing: number[] = [1, 1, 1, 1];
  recipeSelected = {} as RecipeModel;
  customerSelected = {} as CustomerModel;
  customerWithTable: CustomerModel[] = [];
  customerIndexSelected: number = 0;
  ingredientsQuantityAvailable: number[] = [];
  manager = {} as ManagerModel;
  textdark = 'text-dark';
  textred = 'text-danger';
  recipeReady = false;
  customerChoosing = false;

  obsInventory$ = this.inventoryManagerService.inventaireConnect$;
  obsCustomer$ = this.customerService.customers$;
  obsRecipes$ = this.recipesService.recipes$;
  obsIngredients$ = this.ingredientsService.ingredients$;
  obsManager$ = this.managerService.manager$;
  obsRecipeCustomer$ = this.recipeCustomerService.recipeCustomer$;

  numberExemple = 30;

  constructor(
    private recipesService: RecipeService,
    private ingredientsService: IngredientsService,
    private inventoryManagerService: InventoryManagerService,
    private customerService: CustomerManagementService,
    private managerService: ManagerService,
    private recipeCustomerService: RecipeCustomerService
  ) {}

  ngOnInit(): void {
    this.obsInventory$.pipe(shareReplay());
    this.obsCustomer$.pipe(shareReplay());
    this.obsRecipes$.pipe(shareReplay());
    this.obsIngredients$.pipe(shareReplay());
    this.obsManager$.pipe(shareReplay());
    this.obsRecipeCustomer$.pipe(shareReplay());

    this.sub = this.obsRecipes$.subscribe((recipes) => {
      this.listAllRecipes = recipes;

      console.log(this.listAllRecipes);
    });
    this.sub = this.obsInventory$.subscribe((inventory) => {
      this.inventory = inventory;
      console.log(this.inventory);
    });
    this.sub = this.obsIngredients$.subscribe((ingredients) => {
      this.ingredients = ingredients;
      console.log(this.ingredients);
    });
    this.sub = this.obsManager$.subscribe((manager) => {
      this.manager = manager;
      console.log(this.manager);
    });
    this.sub = this.obsCustomer$.subscribe((customers) => {
      this.customers = customers;
      this.customers.forEach((customer) => {
        if (
          customer.idTableRest != null &&
          customer.consommationStart == null
        ) {
          if (customer.commandList != null) {
            customer.commandList.forEach((recipeCustomerTemp) => {
              if (recipeCustomerTemp.recipeStart == null) {
                this.customerWithTable.push(customer);
              }
            });
          }
        }
      });
      console.log(this.customers);
    });

    this.refreshRecipeCustomerPreparation();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe;
  }
  selectRecipe(index: number) {
    let ingredient: IngredientQuantity | undefined;
    let nbIngredients = 0;

    if (
      this.recipeSelected != undefined &&
      this.recipeSelected.id != this.listAllRecipes[index].id
    ) {
      this.ingredientsRecipe = [];
      this.numberNothing = [];
      this.ingredientsQuantityAvailable = [];
      this.recipeSelected = this.listAllRecipes[index];
      this.recipeReady = true;

      this.recipeSelected.tabIngredientsForRecipe.forEach(
        (ingredientQuantity) => {
          ingredient = this.ingredients.find(
            (element) => element.id == ingredientQuantity.id
          );
          if (ingredient != undefined) {
            this.ingredientsRecipe.push(ingredient);
          }
          ingredient = this.inventory.find(
            (element) => element.id == ingredientQuantity.id
          );
          if (ingredient != undefined) {
            this.ingredientsQuantityAvailable.push(ingredient.quantity!);
          } else {
            this.ingredientsQuantityAvailable.push(0);
            this.recipeReady = false;
          }
          nbIngredients++;
        }
      );

      for (let index = 0; index < 4 - nbIngredients; index++) {
        this.numberNothing.push(1);
      }
    }
  }

  customerChange(event: Event): void {
    if (event.target instanceof HTMLSelectElement && event.target.value != '') {
      this.customerIndexSelected = parseInt(event.target.value);
      this.customerChoosing = true;
    } else {
      this.customerIndexSelected = 0;
      this.customerChoosing = false;
    }
  }

  commitRecipe() {
    if (this.customerChoosing == true && this.recipeSelected != undefined) {
      // envoi du Post avec comme argument this.requestRecipeDto ;
      this.recipesService
        .requestRecipe(
          this.manager,
          this.recipeSelected,
          this.customerWithTable[this.customerIndexSelected]
        )
        .subscribe((customer) => {
          for (let i = 0; i < this.customerWithTable.length; i++) {
            if (this.customerWithTable[i].id == customer.id) {
              this.customerWithTable.splice(i, 1);
              break;
            }
          }
          let recipeCustomerPreparation = {} as RecipeCustomerPreparation;

          recipeCustomerPreparation.recipe = this.recipeSelected;
          recipeCustomerPreparation.recipeStart = Date.now();
          recipeCustomerPreparation.pourcentProgress = '0%';
          this.listPreparedRecipe.push(recipeCustomerPreparation);
          //this.refreshRecipeCustomerPreparation();
        });
    }
  }

  private refreshRecipeCustomerPreparation() {
    this.sub = this.obsRecipeCustomer$.subscribe((recipeCustomers) => {
      recipeCustomers.forEach((element) => {
        let customerAlreadyServed = true;

        let curentCustomer = this.customers.find(
          (cutomerTemp) => cutomerTemp.id == element.customerId
        );
        if (
          curentCustomer != null &&
          curentCustomer.consommationStart == null
        ) {
          customerAlreadyServed = false;
        }

        if (
          element.recipeStart != null &&
          customerAlreadyServed == false &&
          curentCustomer != null
        ) {
          let recipeCustomerPreparation = {} as RecipeCustomerPreparation;
          recipeCustomerPreparation.customer = curentCustomer;
          recipeCustomerPreparation.recipe = this.listAllRecipes.find(
            (recipe) => recipe.id == element.recipeId
          )!;
          recipeCustomerPreparation.recipeStart = parseInt(element.recipeStart);

          let elapsedTime = Date.now() - recipeCustomerPreparation.recipeStart;

          if (elapsedTime < recipeCustomerPreparation.recipe.preparationTime) {
            let pourcent = Math.ceil(
              (elapsedTime * 100) /
                recipeCustomerPreparation.recipe.preparationTime
            );
            recipeCustomerPreparation.pourcentProgress = pourcent + '%';
          } else {
            if (elapsedTime >= 0) {
              recipeCustomerPreparation.pourcentProgress = '100%';
            }
          }

          this.listPreparedRecipe.push(recipeCustomerPreparation);
        }
      });
    });
  }

  serveAtCustomer(idCustomer: number) {
    let curentCustomer = this.customers.find(
      (cutomerTemp) => cutomerTemp.id == idCustomer
    );
    if (curentCustomer != null) {
      this.customerService.customerServed(curentCustomer);

      for (let i = 0; i < this.listPreparedRecipe.length; i++) {
        if (this.listPreparedRecipe[i].customer.id == idCustomer) {
          this.customerWithTable.splice(i, 1);
          break;
        }
      }
    }
  }
}
