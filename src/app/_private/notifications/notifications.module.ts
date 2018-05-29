import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { NotificationsReducers, NotificationReducers } from '../../ngrx/notification/notifications.reducers';
import { NotificationsEffects } from '../../ngrx/notification/notifications.effects';
import { NotificationsServices } from '../../ngrx/notification/notifications.services';

import { DataViewModule } from '../../_components/mdb/dataView';

import { NotificationsRoutingModule } from './notifications-routing.module';
import { NotificationsComponent } from './notifications.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    TranslateModule,

    MDBBootstrapModulesPro,

    StoreModule.forFeature('notifications', NotificationsReducers),
    StoreModule.forFeature('notification', NotificationReducers),
    EffectsModule.forFeature([ NotificationsEffects ]),

    DataViewModule,

    NotificationsRoutingModule,
  ],
  declarations: [
    NotificationsComponent,
  ],
  providers: [],
  exports: [],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class NotificationsModule {}
