import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CronometroPageRoutingModule } from './cronometro-routing.module';

import { CronometroPage } from './cronometro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CronometroPageRoutingModule
  ],
  declarations: [CronometroPage]
})
export class CronometroPageModule {}
