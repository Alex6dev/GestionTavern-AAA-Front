import { CategoryModel } from './category';
import { CustomerModel } from './customer';
import { IngredientModel, IngredientQuantity } from './ingredient';
import { ManagerModel } from './manager';
import { PlaceModel } from './place';
import { RecipeCustomerModel, RecipeModel } from './recipe';
import { SubCategoryModel } from './subcategory';
import { TableRestModel } from './table-rest';

export interface LoadManager {
  manager: ManagerModel;
  categories: CategoryModel[];
  customers: CustomerModel[];
  ingredients: IngredientModel[];
  inventoryManagerIngredient: IngredientQuantity[];
  recipeCustomer: RecipeCustomerModel[];
  places: PlaceModel[];
  recipes: RecipeModel[];
  subCategories: SubCategoryModel[];
  tableRests: TableRestModel[];
}
