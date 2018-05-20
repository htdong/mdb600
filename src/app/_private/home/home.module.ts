import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { IconBoardModule } from '../../_components/mdb/iconBoard';

import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';

import { DataViewModule } from 'primeng/dataview';

import { MDBBootstrapModules } from 'ng-mdb-pro';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    TranslateModule,

    IconBoardModule,

    DialogModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    DataViewModule,

    MDBBootstrapModules,

    HomeRoutingModule,
  ],
  declarations: [
    HomeComponent,
  ],
  providers: [],
  exports: [],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class HomeModule {}
