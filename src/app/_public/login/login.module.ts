import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';


import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    TranslateModule,

    MDBBootstrapModulesPro,

    LoginRoutingModule,
  ],
  declarations: [
    LoginComponent,
  ],
  providers: [],
  exports: [],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class LoginModule {}
