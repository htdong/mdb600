import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';

import { IconBoardModule } from './../../_components/mdb/iconBoard/iconBoard.module';

import { ThemesRoutingModule } from './themes-routing.module';
import { ThemesComponent } from './themes.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    TranslateModule,

    MDBBootstrapModulesPro,

    IconBoardModule,

    ThemesRoutingModule,
  ],
  declarations: [
    ThemesComponent,
  ],
  providers: [],
  exports: [],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class ThemesModule {}
