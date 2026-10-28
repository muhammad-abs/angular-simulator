import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { Preset } from '@primeuix/themes/types';
import { PRESETS_MAP } from './core/configs/prime-preset.config';
import { PrimePreset } from './shared/enums/PrimePreset';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpLoggingInterceptor } from './core/interceptors/http-logging.interceptor';
import { httpErrorInterceptor } from './core/interceptors/http-error.interceptor';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { AuthService } from '../app/core/services/auth.service';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { APP_CONFIG } from './core/tokens/app-configuration.token';
import { configuration } from './core/configs/configuration';
import { provideStore } from '@ngrx/store'
import { recipesReducer } from './features/recipes/state/recipes.reducer';
import { provideEffects } from '@ngrx/effects';
import { RecipeEffects } from './features/recipes/state/recipe.effects';
import { RECIPES_FEATURE_KEY } from './features/recipes/interfaces/IRecipesState';

function getInitialPreset(): Preset {
  const savedPreset: PrimePreset | null = localStorage.getItem(
    'prime-preset',
  ) as PrimePreset | null;

  return PRESETS_MAP[savedPreset ?? PrimePreset.AURA];
}

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: { dateFormat: 'dd.MM.yyyy HH:mm' },
    },
    {
      provide: APP_CONFIG,
      useValue: configuration,
    },
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideZoneChangeDetection(),
    providePrimeNG({
      theme: {
        preset: getInitialPreset(),
        options: {
          darkModeSelector: '.my-app-dark',
        },
      },
    }),
    provideHttpClient(
      withInterceptors([httpLoggingInterceptor, httpErrorInterceptor, authInterceptor]),
    ),
    provideAppInitializer(() => {
      const authService = inject(AuthService);
      return authService.initializeApp();
    }),
    provideStore({
      [RECIPES_FEATURE_KEY]: recipesReducer
    }),
    provideEffects([RecipeEffects])
  ],
};
