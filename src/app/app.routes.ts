import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NotFoundPageComponent } from '../components/not-found-page/not-found-page.component';
import { HomePageComponent } from '../components/home-page/home-page.component';
import { UsersPageComponent } from '../components/users-page/users-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'users', component: UsersPageComponent },
  { path: '**', component: NotFoundPageComponent }
];
