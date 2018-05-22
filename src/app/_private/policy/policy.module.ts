import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';

import { PolicyRoutingModule } from './policy-routing.module';
import { PolicyComponent } from './policy.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    TranslateModule,

    MDBBootstrapModulesPro,

    PolicyRoutingModule,
  ],
  declarations: [
    PolicyComponent,
  ],
  providers: [],
  exports: [],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class PolicyModule {}
