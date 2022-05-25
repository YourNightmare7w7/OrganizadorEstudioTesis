import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { AddEventPage } from '../add-event/add-event.page';
import { Platform } from '@ionic/angular';
import { Datos } from 'src/app/Interfaces/datos';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { FireBaseServiceService } from 'src/app/services/fire-base-service.service';
@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  events = [];
  date = new Date();

  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'today prev,next',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    footerToolbar: {
      center: 'title',
    },
    events: this.events,
    titleFormat: { year: 'numeric', month: 'short' },
    duration: { days: 3 },
    eventDrop: (e) => {
      console.log(e);
    },
    eventResize: (e) => {
      console.log(e);
    },
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
  constructor(
    public modaCtrl: ModalController,
    public platform: Platform,
    public afs: FireBaseServiceService
  ) {}

  async ngOnInit() {
    this.values();

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

  values() {
    this.afs.getValues('Calendar').subscribe((e) => {
      this.calendarComponent.getApi().removeAllEvents();

      e.forEach((element) => {
        const event = {
          title: element.title,
          id: element.id,
          start: new Date(1000 * element.start.seconds),
          end: new Date(1000 * element.end.seconds),
          allDay: element.allDay,
        };
        const indx = this.events.findIndex((even) => even.id === event.id);
        if (indx !== -1) {
          this.events[indx] = event;
        } else {
          this.events.push(event);
        }
        this.calendarComponent.getApi().addEventSource([event]);
      });
    });
  }

  async addEventSelect(info) {
    const calendarApi = this.calendarComponent.getApi();
    //se obtiene la api de fullcalendar para modificar
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
        if (modelDate !== null && modelDate.data !== undefined) {
          const id = this.orden();
          const event = {
            id: id.toString(),
            title: modelDate.data[0] || 'event',
            start: modelDate.data[2],
            end: modelDate.data[3],
            allDay: modelDate.data[1],
          };
          console.log(event);
          this.afs.addData('Calendar', event);
          //agregamos el evento al calendario
          calendarApi.addEvent(event);
        }
      });

      return await modal.present();
    }
  }

  orden() {
    const id = Math.max(...this.events.map((d) => parseInt(d.id, 10)), 0) + 1;
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
      if (
        modelDate.data !== null &&
        modelDate.data !== 'delete' &&
        modelDate.data !== undefined
      ) {
        const calendarApi = this.calendarComponent.getApi();
        const event = {
          id: info.id,
          title: modelDate.data[0],
          start: modelDate.data[2],
          end: modelDate.data[3],
          allDay: modelDate.data[1],
        };
        this.afs.changeValues('Calendar', info.id, event);
      } else {
        this.afs.deleteData('Calendar', info.id);
      }
    });
    return await modalE.present();
  }
}
