import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { Preset } from '@primeuix/themes/types';
import { PRESETS_MAP } from '../configs/Preset.config'
import { PrimePreset } from '../enums/PrimePreset';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpLoggingInterceptor } from '../interceptors/http-logging.interceptor';
import { httpErrorInterceptor } from '../interceptors/http-error.interceptor';

function getInitialPreset(): Preset {
  const savedPreset: PrimePreset | null = localStorage.getItem('prime-preset') as PrimePreset | null;
  
  return PRESETS_MAP[savedPreset ?? PrimePreset.AURA];
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideZoneChangeDetection(),
    providePrimeNG({
      theme: {
        preset: getInitialPreset(),
        options: {
          darkModeSelector: '.my-app-dark'
        }
      }
    }),
    provideHttpClient(withInterceptors([httpLoggingInterceptor, httpErrorInterceptor]))
  ]
};
