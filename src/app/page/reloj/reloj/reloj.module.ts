import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RelojPageRoutingModule } from './reloj-routing.module';

import { RelojPage } from './reloj.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RelojPageRoutingModule
  ],
  declarations: [RelojPage]
})
export class RelojPageModule {}
