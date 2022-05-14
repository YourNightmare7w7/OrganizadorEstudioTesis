import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PopoverController, IonDatetime } from '@ionic/angular';

@Component({
  selector: 'app-conf',
  templateUrl: './conf.page.html',
  styleUrls: ['./conf.page.scss'],
})
export class ConfPage implements OnInit {
  @ViewChild('time') ionDate: IonDatetime;

  @Input () alarm: any;

  constructor(public popCtrl: PopoverController) { }

  ngOnInit() {
  }

  async changeAlarm(){
    await this.ionDate.confirm();


    this.popCtrl.dismiss(this.alarm);
  }

}
