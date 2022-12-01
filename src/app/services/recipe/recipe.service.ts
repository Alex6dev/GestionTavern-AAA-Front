import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CustomerModel } from 'src/app/interfaces/customer';
import { ManagerModel } from 'src/app/interfaces/manager';
import {
  RecipeModel,
  RecipeCustomerInventoryIngredientModel,
} from 'src/app/interfaces/recipe';
import { environment } from 'src/environments/environment';
import { CustomerManagementService } from '../customerManagement/customer-management.service';
import { InventoryManagerService } from '../inventoryManager/inventory-manager.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipes = new BehaviorSubject<RecipeModel[]>([] as RecipeModel[]);
  recipes$ = this.recipes.asObservable();

  urlRequestRecipe = environment.apiUrl + 'api/game/recipe/requestRecipe';

  constructor(
    private http: HttpClient,
    private customerManagementService: CustomerManagementService,
    private inventoryManager: InventoryManagerService
  ) {}

  setRecipes(newRecipes: RecipeModel[]): void {
    this.recipes.next(newRecipes);
  }
  getRecipeById(idRecipe: number): RecipeModel | null {
    let recipe: RecipeModel | null = null;
    this.recipes.value.forEach((recipeCurrent) => {
      if (recipeCurrent.id == idRecipe) recipe = recipeCurrent;
    });
    return recipe;
  }

  requestRecipe(
    manager: ManagerModel,
    recipe: RecipeModel,
    customer: CustomerModel
  ): Observable<CustomerModel> {
    return new Observable<CustomerModel>((subscriber) => {
      const body = JSON.parse(
        `{"managerId":${manager.id},"recipeId":${recipe.id},"customerId":${customer.id}}`
      );
      this.http
        .post<RecipeCustomerInventoryIngredientModel>(
          this.urlRequestRecipe,
          body
        )
        .subscribe((recipeCustomerInventory) => {
          this.inventoryManager.setInventaire(
            recipeCustomerInventory.inventaire
          );

          subscriber.next(recipeCustomerInventory.customer);
          //a voir pour lancer un compteur
        });
    });
  }
}
