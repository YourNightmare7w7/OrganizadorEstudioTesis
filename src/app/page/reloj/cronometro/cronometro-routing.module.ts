import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CronometroPage } from './cronometro.page';

const routes: Routes = [
  {
    path: '',
    component: CronometroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CronometroPageRoutingModule {}
