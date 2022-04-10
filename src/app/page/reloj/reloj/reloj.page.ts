import { RelojService } from './../../../services/reloj.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { format, parseISO } from 'date-fns';
import { PopoverController, NavController } from '@ionic/angular';
import { IonDatetime, IonModal } from '@ionic/angular';

@Component({
  selector: 'app-reloj',
  templateUrl: './reloj.page.html',
  styleUrls: ['./reloj.page.scss'],
})
export class RelojPage implements OnInit {
  @ViewChild('popoverDatetime') datetime: IonDatetime;
  @ViewChild('popoverDatetime1') datetime2: IonDatetime;

  time: Date = new Date();
  alarm1: any;
  alarm2: any;


  constructor(private navCtrl: NavController, public popCtrl: PopoverController, public relojS: RelojService) {}
  toCro(){
    this.navCtrl.navigateForward('cronometro');
    this.popCtrl.dismiss();
  }
  toTemp(){
    this.navCtrl.navigateForward('temporizador');
    this.popCtrl.dismiss();

  }
  reloj() {
    setTimeout(() => {
      this.time = new Date();
      this.reloj();
    }, 1000);
  }
  ngOnInit() {
    this.reloj();
  }
  async addAlarm() {
    await this.datetime.confirm();
    this.popCtrl.dismiss();
    this.datetime.reset();
    this.relojS.addAlarm(this.alarm1);
  }

  async changeAlarm(id) {
    await this.datetime2.confirm();
    this.popCtrl.dismiss();
    this.datetime2.reset();
    this.relojS.changeAlarm(id, this.alarm2);
  }

}
