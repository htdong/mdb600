import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { MDBBootstrapModules } from 'ng-mdb-pro';

import { ForgotRoutingModule } from './forgot-routing.module';
import { ForgotComponent } from './forgot.component';

import { UserService } from '../../_system/services/user.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MDBBootstrapModules,

    TranslateModule,

    ForgotRoutingModule,
  ],
  declarations: [
    ForgotComponent,
  ],
  providers: [
    UserService
  ],
  exports: [],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class ForgotModule {}
