import { InjectionToken } from '@angular/core';
import { IAppConfig } from './IAppConfig';

export const APP_CONFIG: InjectionToken<IAppConfig> = new InjectionToken<IAppConfig>('APP_CONFIG');
