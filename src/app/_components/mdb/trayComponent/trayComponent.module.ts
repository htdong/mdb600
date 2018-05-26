import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { TrayComponent } from './trayComponent.component';

import {
  CardsModule,
  WavesModule
} from 'ng-uikit-pro-standard';

@NgModule({
  declarations: [
    TrayComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,

    TranslateModule,

    CardsModule,
    WavesModule
  ],
  exports: [
    TrayComponent
  ],
})
export class TrayComponentModule {
}
