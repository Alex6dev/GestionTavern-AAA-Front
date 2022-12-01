import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadManager } from 'src/app/interfaces/load-manager';
import { environment } from 'src/environments/environment';
import { CategoriesSubcatgoriesService } from '../categories-subcatgories/categories-subcatgories.service';
import { CustomerManagementService } from '../customerManagement/customer-management.service';
import { IngredientsService } from '../ingredients/ingredients.service';
import { InventoryManagerService } from '../inventoryManager/inventory-manager.service';
import { ManagerService } from '../manager/manager.service';
import { PlacesService } from '../places/places.service';
import { RecipeService } from '../recipe/recipe.service';
import { RecipeCustomerService } from '../recipeCustomer/recipe-customer.service';
import { TableRestService } from '../tableRest/tableRest.service';

@Injectable({
  providedIn: 'root',
})
export class LoadManagerService {
  emailPlayer = sessionStorage.getItem('email');

  private urlLoadManager = environment.apiUrl + 'api/game/manager/loadManager';
  constructor(
    private http: HttpClient,
    private managerService: ManagerService,
    private customerManagementService: CustomerManagementService,
    private categorieSubCategoriesService: CategoriesSubcatgoriesService,
    private ingredientsService: IngredientsService,
    private inventoryManagerService: InventoryManagerService,
    private placesServices: PlacesService,
    private recipesServices: RecipeService,
    private tableRestService: TableRestService,
    private recipeCustomerService: RecipeCustomerService
  ) {}

  loadManager(idManager: number) {
    const body = JSON.parse(
      `{"managerId": ${idManager}, "email": "${this.emailPlayer}"}`
    );
    this.http
      .post<LoadManager>(this.urlLoadManager, body)
      .subscribe((response) => {
        this.recipesServices.setRecipes(response.recipes);
        this.managerService.setManager(response.manager);
        this.categorieSubCategoriesService.setCategories(response.categories);
        this.categorieSubCategoriesService.setSubCategories(
          response.subCategories
        );
        this.ingredientsService.setIngredients(response.ingredients);
        this.inventoryManagerService.setInventaire(
          response.inventoryManagerIngredient
        );
        this.placesServices.setPlaces(response.places);
        this.tableRestService.setTables(response.tableRests);
        this.customerManagementService.setCustomers(response.customers);
        this.recipeCustomerService.setRecipeCustomer(response.recipeCustomer);
      });
  }
}
