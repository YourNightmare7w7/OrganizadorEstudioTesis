import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { AddEventPage } from '../add-event/add-event.page';
import { Platform } from '@ionic/angular';
import esLocale from '@fullcalendar/core/locales/es';
import 'bootstrap/dist/css/bootstrap.css';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
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
    locale: esLocale,
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
    public afs: FireBaseServiceService,
    private screenOrientation: ScreenOrientation
  ) {}

  async ngOnInit() {
    this.screenOrientation.onChange().subscribe((i) => {
      this.resize();
    });
    this.values();
  }
  resize() {
    if (this.screenOrientation.type === 'portrait-primary') {
      this.calendarComponent.options.height = this.platform.width() * 0.9;
    } else {
      this.calendarComponent.options.height = this.platform.width() * 0.75;
    }
  }
  ionViewDidEnter() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
      if (this.screenOrientation.type === 'portrait-primary') {
        this.calendarOptions.height = this.platform.height() * 0.9;
      } else {
        this.calendarOptions.height = this.platform.height() * 0.75;
      }
    }, 1);
  }

  values() {
    this.afs.getValues('Calendar').subscribe((e) => {
      this.calendarComponent.getApi().removeAllEvents();
      let event;
      e.forEach((element) => {
        if (element.rrule === undefined) {
          event = {
            title: element.title,
            id: element.id,
            start: new Date(1000 * element.start.seconds),
            end: new Date(1000 * element.end.seconds),
            allDay: element.allDay,
            color: element.color,
          };
        } else {
          event = {
            title: element.title,
            id: element.id,
            endTime:element.end,
            startTime:element.start,

              rrule: element.rrule,
            color: element.color,
          };
        }

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
      calendarApi.changeView('timeGridDay', info.startStr);
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
          let event;
          if (modelDate.data[5] !== undefined) {
            event = {
              id: id.toString(),
              title: modelDate.data[0] || 'event',
              startTime:modelDate.data[2],

              endTime:modelDate.data[3],
              rrule: modelDate.data[5],
              color: modelDate.data[4],
            };
          } else {
            event = {
              id: id.toString(),
              title: modelDate.data[0] || 'event',
              start: modelDate.data[2],
              end: modelDate.data[3],
              allDay: modelDate.data[1],
              color: modelDate.data[4],
            };
          }
          this.afs.addData('Calendar', event);
          //agregamos el evento al calendario
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
      console.log(modelDate.data);
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
          color: modelDate.data[4],
        };
        this.afs.changeValues('Calendar', info.id, event);
      } else if (modelDate.data === 'delete') {
        this.afs.deleteData('Calendar', info.id);
      }
    });
    return await modalE.present();
  }
}
