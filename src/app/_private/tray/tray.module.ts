import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { TrayComponentModule } from '../../_components/mdb/trayComponent';

import { TrayRoutingModule } from './tray-routing.module';
import { TrayComponent } from './tray.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    TranslateModule,

    TrayComponentModule,

    TrayRoutingModule,
  ],
  declarations: [
    TrayComponent,
  ],
  providers: [],
  exports: [],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class TrayModule {}
