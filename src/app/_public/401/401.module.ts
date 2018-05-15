import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { MDBBootstrapModules } from 'ng-mdb-pro';

import { P401RoutingModule } from './401-routing.module';
import { P401Component } from './401.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    TranslateModule,

    MDBBootstrapModules,

    P401RoutingModule,
  ],
  declarations: [
    P401Component,
  ],
  providers: [],
  exports: [],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class P401Module {}