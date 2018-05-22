import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';

import { TranslateModule } from '@ngx-translate/core';
// import { AppTranslationModule } from '../../_system/app.translation.module';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MDBBootstrapModulesPro,

    TranslateModule,
    // AppTranslationModule,

    LandingRoutingModule,
  ],
  declarations: [
    LandingComponent,
  ],
  providers: [],
  exports: [],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class LandingModule {}
