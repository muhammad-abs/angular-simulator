import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/auth/components/login/login.component';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../app/features/home/components/home-page/home-page.component').then((m) => m.HomePageComponent),
  },
  {
    path: 'quotes',
    loadComponent: () =>
      import('../app/features/quotes/quotes/quotes.component').then((m) => m.QuotesComponent),
  },
  {
    path: 'recipes',
    loadComponent: () =>
       import('../app/features/recipes/components/recipes/recipes.component').then((m) => m.RecipesComponent),
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./features/users/components/users-page/users-page.component').then((m) => m.UsersPageComponent),
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'posts',
    loadChildren: () => import('./features/posts/posts.routes').then((m) => m.postsRoutes),
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'products',
    loadChildren: () => import('./features/products/products.routes').then((m) => m.productsRoutes)
  },
  {
    path: '**',
    loadComponent: () =>
      import('./features/home/components/not-found-page/not-found-page.component').then(
        (m) => m.NotFoundPageComponent,
      ),
  },
];
