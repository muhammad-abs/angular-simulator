import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IRecipesState, RECIPES_FEATURE_KEY } from "../interfaces/IRecipesState";

export const selectRecipeState = createFeatureSelector<IRecipesState>(RECIPES_FEATURE_KEY);

export const selectRecipes = createSelector(selectRecipeState, (state: IRecipesState) => state.recipes);
export const selectRecipesLoading = createSelector(selectRecipeState, (state: IRecipesState) => state.loading);
export const selectRecipesError = createSelector(selectRecipeState, (state: IRecipesState) => state.error);