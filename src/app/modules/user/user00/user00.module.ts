import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';

import { IconBoardModule } from '../../../_components/mdb/iconBoard';

import { User00RoutingModule } from './user00-routing.module';
import { User00Component } from './user00.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    TranslateModule,

    MDBBootstrapModulesPro,

    IconBoardModule,

    User00RoutingModule,
  ],
  declarations: [
    User00Component,
  ],
  providers: [],
  exports: [],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class User00Module {}
