import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IRecipe } from '../interfaces/IRecipe';
import { IRecipesResponse } from '../interfaces/IRecipesResponse';
import { BaseApiService } from '../../../core/services/base-api.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeApiService extends BaseApiService {
  
  override key: string = 'recipes';
  
  getRecipes(): Observable<IRecipesResponse> {
    return this.get<IRecipesResponse>();
  }
  
}
