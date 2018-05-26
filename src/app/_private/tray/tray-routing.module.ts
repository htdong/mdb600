import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrayComponent } from './tray.component';

const routes: Routes = [
  {
    path: '',
    component: TrayComponent,
    data: {
      title: 'tray'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrayRoutingModule {}
