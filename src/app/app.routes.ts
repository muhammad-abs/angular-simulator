import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'users',
    loadComponent: () => import('../components/users-page/users-page.component')
      .then(m => m.UsersPageComponent)
  },
  {
    path: '',
    loadComponent: () => import('../components/home-page/home-page.component')
      .then(m => m.HomePageComponent)
  },
  {
    path: '**',
    loadComponent: () => import('../components/not-found-page/not-found-page.component')
      .then(m => m.NotFoundPageComponent)
  }
];
