import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { User00Component } from './user00.component';

const routes: Routes = [
  {
    path: '',
    component: User00Component,
    data: {
      title: 'user'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class User00RoutingModule {}
