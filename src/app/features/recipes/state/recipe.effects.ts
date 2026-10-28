import { inject, Injectable } from "@angular/core";
import { RecipeApiService } from "../services/recipe-api.service";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { recipeActions } from "./recipes.actions";
import { catchError, exhaustMap, map, of } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { IRecipesResponse } from "../interfaces/IRecipesResponse";
 
@Injectable()
export class RecipeEffects {
  
  private actions$ = inject(Actions);
  private recipeApiService = inject(RecipeApiService);
  
  loadRecipes = createEffect(() => this.actions$.pipe(
    ofType(recipeActions.loadRecipes),
    exhaustMap(() => this.recipeApiService.getRecipes().pipe(
      map((response: IRecipesResponse) => recipeActions.loadRecipesSuccess({ recipes: response.recipes })),
      catchError((error: HttpErrorResponse) => of(recipeActions.recipesFailure({ error: 'Ошибка при загрузке рецептов' })))
    ))
  ));
  
}