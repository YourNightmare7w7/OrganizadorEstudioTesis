import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RelojPage } from './reloj.page';

const routes: Routes = [
  {
    path: '',
    component: RelojPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RelojPageRoutingModule {}
