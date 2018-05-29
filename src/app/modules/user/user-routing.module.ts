import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    data: {
      title: 'user'
    },
    children: [
      { path: '', redirectTo: 'user00', pathMatch: 'full' },

      { path: 'user00', loadChildren: './user00/user00.module#User00Module' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
