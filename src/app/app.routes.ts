import { Routes } from '@angular/router';
import { authGuard } from '../features/auth/components/auth.guard';
import { LoginComponent } from '../features/auth/components/login/login.component';
import { adminGuard } from '../features/auth/admin.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../components/home-page/home-page.component').then((m) => m.HomePageComponent),
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'users',
    loadComponent: () =>
      import('../components/users-page/users-page.component').then((m) => m.UsersPageComponent),
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'posts',
    loadChildren: () => import('../features/posts/posts.routes').then((m) => m.postsRoutes),
    canActivate: [authGuard, adminGuard],
  },
  {
    path: '**',
    loadComponent: () =>
      import('../components/not-found-page/not-found-page.component').then(
        (m) => m.NotFoundPageComponent,
      ),
  },
];
