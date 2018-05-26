import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompletedComponent } from './completed.component';

const routes: Routes = [
  {
    path: '',
    component: CompletedComponent,
    data: {
      title: 'completed'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompletedRoutingModule {}
