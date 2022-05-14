import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { AddEventPage } from '../add-event/add-event.page';
import { Platform } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { Datos } from 'src/app/Interfaces/datos';
@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  datos: Datos[]=[];
  events=[];
  date = new Date();
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next,today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    events:this.events,
    duration: { days: 3 },
    initialView: 'dayGridMonth',
    dayMaxEventRows:2,
    eventMaxStack:2,
    selectMirror:true,
    editable: true,
    nowIndicator: true,
    selectable: true,
    select:(info)=>{
      this.addEventSelect(info);
  },
  };
  constructor(
    private routerOutlet: IonRouterOutlet,
    public modaCtrl: ModalController,
    public platform: Platform
  ) {}

  async ngOnInit() {

    this.platform.resize.subscribe(async () => {
      this.calendarOptions.contentHeight = this.platform.height() - 170;
    });
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 1);
  }

  async addEventSelect(info) {
    const calendarApi = this.calendarComponent.getApi();
    if(info.view.type==='dayGridMonth'&&info.end.getDate()===info.start.getDate()+1){
      calendarApi.changeView('timeGridDay',info.dateStr);
    }
    else{
      const modal = await this.modaCtrl.create({
        component: AddEventPage,
        initialBreakpoint: 0.8,
        breakpoints: [0, 0.5, 1],
        componentProps: {
          date: info,
        },
      });
      modal.onDidDismiss().then((modelDate) => {
        if (modelDate !== null) {
          this.orden(modelDate.data);

          calendarApi.addEvent({
            title: modelDate.data[0],
            start: modelDate.data[2],
            end: modelDate.data[3],
            allDay: modelDate.data[1],
          });
        }
      });
      console.log(this.events);
      return await modal.present();
    }
  }

  orden(date){
    const dat=format(new Date(date[2]),'yMM');
    console.log(dat);
    const event= {
      title: date[0],
          start: date[2],
          end: date[3],
          allDay: date[1],
    };
   if(this.datos.length===0){
     this.datos.push({
      id: dat,
      events: [event]
     });
   }else{
     const inx=this.datos.findIndex((i)=>i.id===dat);
     if(inx!==-1){
      this.datos[inx].events.push(event);
    }else{
      this.datos.push({
        id: dat,
        events: [event]
       });
    }
   }

    console.log(this.datos);
  }


}
