import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

/**
 * MDBOOTSTRAP
 */
import { MDBBootstrapModules } from 'ng-mdb-pro';
import { MDBSpinningPreloader } from 'ng-mdb-pro';
import { ToastModule } from 'ng-mdb-pro/pro/alerts';

// MY SERVICES - Register for global reference
import { AppConfig } from './app.config';
import { GlobalState } from './global.state';

import { NgaModule } from './_system/nga.module';

// NGRX STORE
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { TopNotificationsReducers } from './ngrx/notification/notifications.reducers';
import { NotificationsEffects } from './ngrx/notification/notifications.effects';
import { NotificationsServices } from './ngrx/notification/notifications.services';

/**
 * _SYSTEM
 */
// import { TranslateModule } from '@ngx-translate/core';
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

    // MDBootstrap
    MDBBootstrapModules.forRoot(),
    ToastModule.forRoot({maxOpened: 10}),

    NgaModule.forRoot(),

    // NGRX STORE
    StoreModule.forRoot({ top_notifications: TopNotificationsReducers }),
    EffectsModule.forRoot([ NotificationsEffects ]),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production // Restrict extension to log-only mode
    }),

    // TranslateModule.forRoot(),
    AppTranslationModule,

    AppRoutes
  ],
  declarations: [
    AppComponent,
    ...APP_LAYOUTS,
  ],
  exports: [
    // TranslateModule,
    AppTranslationModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },

    // MDBootstrap
    MDBSpinningPreloader,

    AppConfig,
    GlobalState,

    NotificationsServices
  ],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
