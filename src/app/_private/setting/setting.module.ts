import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    TranslateModule,

    MDBBootstrapModulesPro,

    SettingRoutingModule,
  ],
  declarations: [
    SettingComponent,
  ],
  providers: [],
  exports: [],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class SettingModule {}
