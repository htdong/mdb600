import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';

import { P403RoutingModule } from './403-routing.module';
import { P403Component } from './403.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    TranslateModule,

    MDBBootstrapModulesPro,

    P403RoutingModule,
  ],
  declarations: [
    P403Component,
  ],
  providers: [],
  exports: [],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class P403Module {}
