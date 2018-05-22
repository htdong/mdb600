import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { LazyLoadImageModule } from 'ng-lazyload-image';

/**
 * MDBOOTSTRAP
 */
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { MDBSpinningPreloader } from 'ng-uikit-pro-standard';
import { ToastModule } from 'ng-uikit-pro-standard';

// MY SERVICES - Register for global reference (Deprecated since Ng6)
import { NgaModule } from './_system/nga.module';

// NGRX STORE
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { TopNotificationsReducers } from './ngrx/notification/notifications.reducers';
import { NotificationsEffects } from './ngrx/notification/notifications.effects';
// import { NotificationsServices } from './ngrx/notification/notifications.services';

/**
 * _SYSTEM
 */
import { AppTranslationModule } from './_system/app.translation.module';

// Layouts
import {
  AppLandingLayoutComponent,
  AppDoubleNavLayoutComponent
} from './_system/_layouts';

const APP_LAYOUTS = [
  AppLandingLayoutComponent,
  AppDoubleNavLayoutComponent
];

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,

    // Service Worker
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),

    LazyLoadImageModule,

    // MDBootstrap
    MDBBootstrapModulesPro.forRoot(),
    ToastModule.forRoot({maxOpened: 10}),

    NgaModule.forRoot(),

    // NGRX STORE
    StoreModule.forRoot({ top_notifications: TopNotificationsReducers }),
    EffectsModule.forRoot([ NotificationsEffects ]),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production // Restrict extension to log-only mode
    }),

    AppTranslationModule,

    AppRoutes
  ],
  declarations: [
    AppComponent,
    ...APP_LAYOUTS,
  ],
  exports: [
    AppTranslationModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },

    // MDBootstrap
    MDBSpinningPreloader,

    // Deprecated since Ng6
    // NotificationsServices
  ],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
