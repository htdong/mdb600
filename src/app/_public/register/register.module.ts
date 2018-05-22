import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';

import { UserService } from '../../_system/services/user.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    TranslateModule,

    MDBBootstrapModulesPro,

    RegisterRoutingModule,
  ],
  declarations: [
    RegisterComponent,
  ],
  providers: [
    UserService
  ],
  exports: [],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class RegisterModule {}
