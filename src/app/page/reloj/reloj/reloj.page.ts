import { RelojService } from './../../../services/reloj.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PopoverController, NavController } from '@ionic/angular';
import { IonDatetime, IonModal } from '@ionic/angular';
import { ConfPage } from '../configu/conf.page';
@Component({
  selector: 'app-reloj',
  templateUrl: './reloj.page.html',
  styleUrls: ['./reloj.page.scss'],
})
export class RelojPage implements OnInit {
  @ViewChild('popoverDatetime') datetime: IonDatetime;

  time: Date = new Date();
  alarm1: any;
  alarm2: any;


  constructor(private navCtrl: NavController, public popCtrl: PopoverController, public relojS: RelojService) {}
  toCro(){
    this.navCtrl.navigateForward('cronometro');
  }
  toTemp(){
    this.navCtrl.navigateForward('temporizador');

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

  async changeAlarm(id,alarm) {
    const popover = await this.popCtrl.create({
      component: ConfPage,

      translucent: true,
      componentProps:{
        alarm
      }
    });
    await popover.present();

    const  a  = await popover.onDidDismiss();
    console.log(a.data);
    this.relojS.changeAlarm(id,a.data);
  }

}
