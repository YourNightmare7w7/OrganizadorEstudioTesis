import { AlarmPage } from './../page/reloj/alarm/alarm.page';
import { Injectable } from '@angular/core';
import { Alarm } from '../Interfaces/alarm';
import { ModalController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';

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
    this.cambio=setInterval(()=>this.alarmTime(),1000);
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
    this.alarms[idAlarm].active = true;


  }

  async alarmTime() {
    this.hora=format(new Date(), 'HH:mm');


  this.alarms.map((e) => {

    const dat = format(parseISO(e.date.toString()), 'HH:mm');
if(this.primera===false){

  if (dat === this.hora&&e.active===true) {
    clearInterval(this.cambio);
    this.primera=true;
    this.alarma(e.id);
  }
}
  });


    }
  async alarma(id) {
    const modal = await this.modalCtrl.create({
      component: AlarmPage,
    });
    modal.onDidDismiss().then((e)=>{
      this.alarms.map(f=>{
        if(f.id===id){
          f.active=e.data;
        }
      });
      this.cambio=setInterval(()=>this.alarmTime(),1000);
      this.primera=false;
    });
    return await modal.present();
  }
}
