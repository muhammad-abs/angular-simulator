import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { recipeActions } from '../../state/recipes.actions';
import { IRecipe } from '../../interfaces/IRecipe';
import { selectRecipes, selectRecipesLoading, selectRecipesError } from '../../state/recipe.selectors';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-recipes',
  imports: [AsyncPipe, ButtonModule, SkeletonModule],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss',
})
export class RecipesComponent implements OnInit {
  
  private store = inject(Store);
  
  recipes$: Observable<IRecipe[]> = this.store.select(selectRecipes);
  error$: Observable<string | null> = this.store.select(selectRecipesError);
  isLoading$: Observable<boolean> = this.store.select(selectRecipesLoading);
  
  ngOnInit(): void {
    this.store.dispatch(recipeActions.loadRecipes());
  }
  
  loadRecipes(): void {
    this.store.dispatch(recipeActions.loadRecipes());
  }
  
}
