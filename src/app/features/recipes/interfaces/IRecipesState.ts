import { IRecipe } from './IRecipe';

export interface IRecipesState {
  recipes: IRecipe[];
  loading: boolean;
  error: string | null;
}

export const RECIPES_FEATURE_KEY: string = 'recipes';