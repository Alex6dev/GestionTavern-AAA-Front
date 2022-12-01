import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IngredientModel } from 'src/app/interfaces/ingredient';

@Injectable({
  providedIn: 'root',
})
export class IngredientsService {
  private ingredients = new BehaviorSubject<IngredientModel[]>(
    [] as IngredientModel[]
  );
  ingredients$ = this.ingredients.asObservable();

  constructor() {}
  setIngredients(newIngredients: IngredientModel[]) {
    this.ingredients.next(newIngredients);
  }
}
