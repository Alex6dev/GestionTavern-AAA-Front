export interface IngredientQuantity {
  id: number;
  name: string;
  level: number;
  buyingPrice: number;
  idSubCategory: number;
  quantity?: number;
}
export interface IngredientModel {
  id: number;
  name: string;
  level: number;
  buyingPrice: number;
  idSubCategory: number;
  //quantity?: number|undefined;
}

export interface ShopIngredientDto {
  idManager: number;
  shopIngredientQuantity: ShopIngredientQuantity[];
}

export interface ShopIngredientQuantity {
  idIngredient: number;
  quantity: number;
}
