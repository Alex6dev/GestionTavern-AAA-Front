import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RecipeCustomerModel } from 'src/app/interfaces/recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeCustomerService {
  private recipeCustomers = new BehaviorSubject<RecipeCustomerModel[]>(
    [] as RecipeCustomerModel[]
  );
  recipeCustomer$ = this.recipeCustomers.asObservable();

  constructor() {}

  setRecipeCustomer(newRecipeCustomer: RecipeCustomerModel[]): void {
    this.recipeCustomers.next(newRecipeCustomer);
  }
}
