import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InProgressComponent } from './inProgress.component';

const routes: Routes = [
  {
    path: '',
    component: InProgressComponent,
    data: {
      title: 'inProgress'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InProgressRoutingModule {}
