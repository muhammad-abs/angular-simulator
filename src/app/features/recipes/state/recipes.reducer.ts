import { createReducer, on } from "@ngrx/store";
import { initialRecipesState } from "./recipes.state";
import { recipeActions } from "./recipes.actions";
import { IRecipesState } from "../interfaces/IRecipesState";

export const recipesReducer = createReducer(
  initialRecipesState,
  on(recipeActions.loadRecipes, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(recipeActions.loadRecipesSuccess, (state: IRecipesState, { recipes }) => ({
    ...state,
    recipes,
    loading: false,
    error: null
  })),
  on(recipeActions.recipesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  })),
);