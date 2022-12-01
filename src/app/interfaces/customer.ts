import { RecipeCustomerModel } from './recipe';

export interface CustomerModel {
  id: number;
  purseOfGold: number;
  happiness: number;
  hunger: number;
  thirst: number;
  nauseaLevel: number;
  alcoholLevel: number;
  toilet: number;
  timeInTavern: string;
  nauseaTolerance: number;
  alcoholTolerance: number;
  gender: number;
  expGiven: number;
  idTableRest: number | null;
  consommationStart?: string;
  commandList?: RecipeCustomerModel[];
  name?: string;
  numImg?: number;
}

export const tabName: string[] = [
  'Isaïe ',
  'Gaël ',
  'Josué ',
  'Grégoire ',
  'Raphaël ',
  'Élisée ',
  'Côme ',
  'Ignace ',
  'Hippolyte ',
  'Anatole ',
  'Bruno ',
  'Armel ',
  'Nathan ',
  'Séverin ',
  'Enzo ',
  'Florent ',
  'Axel ',
  'Achille ',
  'Mathis ',
  'Marius ',
];
export const tabSurName: string[] = [
  'Lussier',
  'Chauve',
  'Lièvremont',
  'Thibodeaux',
  'Carbonneau',
  'Lecerf',
  'Crevier',
  'Hauet',
  'Girault',
  'Chaney',
  'Wathelet',
  'Lambert',
  'Wathelet',
  'Donnet',
  'Clair',
  'Cerfbeer',
  'Lalande',
  'Ballouhey',
  'Moreau',
  'Morin',
];
