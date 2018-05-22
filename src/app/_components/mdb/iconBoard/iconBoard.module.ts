import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { IconBoard } from './iconBoard.component';

import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';

@NgModule({
  declarations: [
    IconBoard
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,

    TranslateModule,

    MDBBootstrapModulesPro
  ],
  exports: [
    IconBoard
  ],
})
export class IconBoardModule {
}
