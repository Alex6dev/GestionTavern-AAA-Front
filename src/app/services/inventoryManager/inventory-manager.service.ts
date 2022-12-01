import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IngredientQuantity } from 'src/app/interfaces/ingredient';
@Injectable({
  providedIn: 'root',
})
export class InventoryManagerService {

  private inventaire: BehaviorSubject<IngredientQuantity[]> =
    new BehaviorSubject<IngredientQuantity[]>({} as IngredientQuantity[]);
  inventaireConnect$ = this.inventaire.asObservable();


  constructor() {}

  setInventaire(newInventaire: IngredientQuantity[]): void {
    this.inventaire.next(newInventaire);
  }

}
