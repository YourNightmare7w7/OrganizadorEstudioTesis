import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarioPageRoutingModule } from './calendario-routing.module';

import { CalendarioPage } from './calendario.page';

import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import listPlugin from '@fullcalendar/list'; // a plugin!
import rrulePlugin from '@fullcalendar/rrule';

// register FullCalendar plugins
FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin  ,
  interactionPlugin,
  listPlugin,
  rrulePlugin
]);
@NgModule({
  imports: [
    FullCalendarModule,
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarioPageRoutingModule,

  ],
  declarations: [CalendarioPage]
})
export class CalendarioPageModule {}
