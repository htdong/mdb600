import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { NgaModule } from '../../../_system/nga.module';
import { DataView } from './dataView.component';

import {
  CardsModule,
  WavesModule,
  SelectModule,
  PreloadersModule
} from 'ng-uikit-pro-standard';

@NgModule({
  declarations: [
    DataView
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    TranslateModule,

    CardsModule,
    WavesModule,
    SelectModule,
    PreloadersModule,

    NgaModule
  ],
  exports: [
    DataView
  ],
})
export class DataViewModule {
}
