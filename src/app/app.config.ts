import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';
import { routes } from './app.routes';
import { Preset } from '@primeuix/themes/types';

function getInitialPreset(): Preset {
  const savedPreset: string | null = localStorage.getItem('prime-preset');
  if (savedPreset === 'nora') return Nora;
  if (savedPreset === 'lara') return Lara;
  else return Aura;
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
    })
  ]
};
