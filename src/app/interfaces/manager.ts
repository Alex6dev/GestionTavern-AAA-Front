import { IngredientQuantity } from './ingredient';

export interface ManagerModel {
  id: number;
  name: string;
  reputation: number;
  chest: number;
  level: number;
  experience: number;
  idPlayer: number;
  maxExp: number;
  ingredientQuantity: IngredientQuantity[];
}
