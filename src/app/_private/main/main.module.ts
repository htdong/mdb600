import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { IconBoardModule } from '../../_components/mdb/iconBoard';

// import {InputTextModule} from 'primeng/inputtext';
// import {ButtonModule} from 'primeng/button';
// import {DialogModule} from 'primeng/dialog';
// import {DropdownModule} from 'primeng/dropdown';
//
// import { DataViewModule } from 'primeng/dataview';

import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    TranslateModule,

    IconBoardModule,

    // DialogModule,
    // DropdownModule,
    // InputTextModule,
    // ButtonModule,
    // DataViewModule,

    MDBBootstrapModulesPro,

    MainRoutingModule,
  ],
  declarations: [
    MainComponent,
  ],
  providers: [],
  exports: [],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class MainModule {}
