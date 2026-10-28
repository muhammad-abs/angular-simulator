import { IRecipesState } from '../interfaces/IRecipesState';

export const initialRecipesState: IRecipesState = {
  recipes: [],
  loading: false,
  error: null,
};