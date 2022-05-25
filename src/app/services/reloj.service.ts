import { FireBaseServiceService } from 'src/app/services/fire-base-service.service';
import { AlarmPage } from './../page/reloj/alarm/alarm.page';
import { Injectable } from '@angular/core';
import { Alarm } from '../Interfaces/alarm';
import { ModalController, NavController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { NativeAudio } from '@awesome-cordova-plugins/native-audio/ngx';
@Injectable({
  providedIn: 'root',
})
export class RelojService {
  audio = new Audio(
    '../../assets/i-dont-get-the-lesson by ziv-grinberg Artlist.mp3'
  );

  alarms: Alarm[] = [];
  hora: any;
  cambio: any;
  primera = false;

  constructor(
    public modalCtrl: ModalController,
    private fire: FireBaseServiceService,
    private navCtrl: NavController
  ) {
    this.alarmTime();
    this.start();
    this.cambio = setInterval(() => this.alarmTime(), 1000);
  }
  start() {
    this.fire.getValues('Alarms').subscribe((alarm) => {
      this.saveV(alarm);
    });
  }
  saveV(data) {
    this.alarms = data;
    console.log(this.alarms);
  }

  save() {
    this.fire.addData('Alarms', this.alarms);
  }

  async addAlarm(date) {
    const id =
      Math.max(...this.alarms.map((alarm) => parseInt(alarm.id, 10)), 0) + 1;
    await this.alarms.push({
      id: id.toString(),
      date,
      active: true,
    });
    this.save();
  }
  async changeAlarm(id, time) {
    const idAlarm = this.alarms.findIndex((e) => e.id === id);
    this.alarms[idAlarm].date = time;
    this.alarms[idAlarm].active = true;

    this.fire.changeValues('Alarms', id, this.alarms[idAlarm]);
  }

  async alarmTime() {
    this.hora = format(new Date(), 'HH:mm');
    this.alarms.map((e) => {
      const dat = format(parseISO(e.date.toString()), 'HH:mm');
      if (this.primera === false) {
        if (dat === this.hora && e.active === true) {
          this.audio.play();
          clearInterval(this.cambio);
          this.primera = true;
          this.alarma(e.id);
        }
      }
    });
  }
  async alarma(id) {
    this.navCtrl.navigateRoot(['alarm/', id]);
  }
  apagar(id) {
    this.alarms.map((f) => {
      if (f.id === id) {
        f.active = false;
        this.fire.changeValues('Alarms', f.id, f);
        this.audio.pause();
        this.audio = new Audio(
          '../../assets/i-dont-get-the-lesson by ziv-grinberg Artlist.mp3'
        );
      }
    });
    this.cambio = setInterval(() => this.alarmTime(), 1000);
    this.primera = false;
  }
}
