import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { AddEventPage } from '../add-event/add-event.page';
import { Platform } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { Datos } from 'src/app/Interfaces/datos';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { FireBaseServiceService } from 'src/app/services/fire-base-service.service';
import { id } from 'date-fns/locale';
@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  datos: Datos[] = [];
  events;
  eve =[];
  date = new Date();
  calendarOptions: CalendarOptions;
  constructor(
    public modaCtrl: ModalController,
    public platform: Platform,
    public afs: FireBaseServiceService
  ) {

  }

  async ngOnInit() {
    await this.get();

    this.calendarOptions= {
      headerToolbar: {
        left: 'today prev,next',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
      },
      footerToolbar: {
        center: 'title',
      },

      titleFormat: { year: 'numeric', month: 'short' },
      duration: { days: 3 },
      initialView: 'dayGridMonth',
      dayMaxEventRows: 2,
      eventMaxStack: 2,
      selectMirror: true,
      editable: true,
      nowIndicator: true,
      selectable: true,
      eventClick: (info) => this.eventInfo(info.event),
      select: (info) => {
        this.addEventSelect(info);
      },
    };


    this.calendarOptions.height =
      this.platform.height() - this.platform.height() * 0.2;
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 1);
  }
  ionViewDidEnter() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 1);
  }

  async get(){
    await this.afs.getValues('Calendar').subscribe(even=>{
      this.save(even);
    });
  }
  save(a){
    this.events=a;

    console.log(this.events);
  }

  async addEventSelect(info) {
    //se obtiene la api de fullcalendar para modificar
    const calendarApi = this.calendarComponent.getApi();
    //comprueba si selecciono un solo dia dentro del visor de meses
    //si es asi nos traslada a la vista del dia seleccionado
    if (
      info.view.type === 'dayGridMonth' &&
      info.end.getDate() === info.start.getDate() + 1
    ) {
      calendarApi.changeView('timeGridDay', info.dateStr);
    } else {
      //Creamos un modal y presentamos
      //la ventana de creación de eventos
      const modal = await this.modaCtrl.create({
        component: AddEventPage,
        initialBreakpoint: 0.5,
        breakpoints: [0, 0.5, 1],
        componentProps: {
          date: info, //pasamos la información de los días seleccionados
          event: false,
        },
      });
      //recuperamos la información del evento
      modal.onDidDismiss().then((modelDate) => {
        if (modelDate !== null) {
          const id = this.orden(modelDate.data);
          const event = {
            id: id.toString(),
            title: modelDate.data[0] || 'event',
            start: modelDate.data[2],
            end: modelDate.data[3],
            allDay: modelDate.data[1],
          };
          //agregamos el evento al calendario
          calendarApi.addEvent(event);
        }
      });

      return await modal.present();
    }
  }


  orden(date) {
    const dat = format(new Date(date[2]), 'yMM');
    const indx = this.datos.findIndex((i) => i.id === dat);
    let id = 1;
    if (indx !== -1) {
      id =
        Math.max(...this.datos[indx].events.map((d) => parseInt(d.id, 10)), 0) +
        1;
    }
    console.log(dat);
    const event = {
      id: id.toString(),
      title: date[0],
      start: date[2],
      end: date[3],
      allDay: date[1],
    };
    if (this.datos.length === 0) {
      this.datos.push({
        id: dat,
        events: [event],
      });
    } else {
      const inx = this.datos.findIndex((i) => i.id === dat);
      if (inx !== -1) {
        this.datos[inx].events.push(event);
      } else {
        this.datos.push({
          id: dat,
          events: [event],
        });
      }
    }

    return id;
  }
  async eventInfo(info) {
    console.log(info);
    const modalE = await this.modaCtrl.create({
      component: AddEventPage,
      initialBreakpoint: 0.5,
      breakpoints: [0, 0.9, 1],
      componentProps: {
        date: info, //pasamos la información de los días seleccionados
        event: true,
      },
    });
    //recuperamos la información del evento
    modalE.onDidDismiss().then((modelDate) => {
      if (modelDate !== null) {
        const calendarApi = this.calendarComponent.getApi();
        const event = {
          id: info.id,
          title: modelDate.data[0],
          start: modelDate.data[2],
          end: modelDate.data[3],
          allDay: modelDate.data[1],
        };
      }
    });
    return await modalE.present();
  }
}
