import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LazyLoadImageModule } from 'ng-lazyload-image';
import { TranslateModule } from '@ngx-translate/core';

import { MDBBootstrapModules } from 'ng-mdb-pro';

import { LockscreenRoutingModule } from './lockscreen-routing.module';
import { LockscreenComponent } from './lockscreen.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    LazyLoadImageModule,
    TranslateModule,

    MDBBootstrapModules,

    LockscreenRoutingModule,
  ],
  declarations: [
    LockscreenComponent,
  ],
  providers: [],
  exports: [],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class LockscreenModule {}
