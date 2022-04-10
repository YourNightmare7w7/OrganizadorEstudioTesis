import { AlarmPage } from './../page/reloj/alarm/alarm.page';
import { Injectable } from '@angular/core';
import { Alarm } from '../Interfaces/alarm';
import { ModalController } from '@ionic/angular';
import { BackgroundMode } from '@awesome-cordova-plugins/background-mode/ngx';
import { format, parseISO } from 'date-fns';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RelojService {
  alarms: Alarm[] = [];
  hora: any;
  cambio: any;
  primera= false;

  constructor(public modalCtrl: ModalController) {
    this.alarmTime();
    setInterval(this.time,1000);
    this.cambio= this.time;
  }

  async addAlarm(date) {
    const id =
      Math.max(...this.alarms.map((note) => parseInt(note.id, 10)), 0) + 1;
    await this.alarms.push({
      id: id.toString(),
      date,
      active: true,
    });
  }
  async changeAlarm(id, time) {
    const idAlarm = this.alarms.findIndex((e) => e.id === id);
    this.alarms[idAlarm].date = time;
  }

  async alarmTime() {

if(this.hora!==this.cambio||this.primera===true){
  this.alarms.map((e) => {
    const dat = format(parseISO(e.date.toString()), 'HH:mm');
    if(this.primera===true){this.primera=false}
    if (dat === this.hora) {
      this.modal();
    }
  });
}


    }
  time(){
    this.hora = new Date().getHours()+':'+new Date().getMinutes();

  }
  async modal() {
    const modal = await this.modalCtrl.create({
      component: AlarmPage,
    });
    return await modal.present();
  }
}
