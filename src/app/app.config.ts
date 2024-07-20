import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideClientHydration(),
    importProvidersFrom(RouterModule.forRoot(routes)),
  ],
};
