import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IncidentComponent } from './incident.component';

const routes: Routes = [
  {
    path: '',
    component: IncidentComponent,
    data: {
      title: 'incident'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncidentRoutingModule {}
