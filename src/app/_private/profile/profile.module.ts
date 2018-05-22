import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LazyLoadImageModule } from 'ng-lazyload-image';
import { TranslateModule } from '@ngx-translate/core';

import { ImageCropperModule } from 'ngx-image-cropper';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    LazyLoadImageModule,
    TranslateModule,

    ImageCropperModule,
    MDBBootstrapModulesPro,

    ProfileRoutingModule,
  ],
  declarations: [
    ProfileComponent,
  ],
  providers: [],
  exports: [],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class ProfileModule {}
