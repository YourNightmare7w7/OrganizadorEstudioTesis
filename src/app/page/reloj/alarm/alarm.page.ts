import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.page.html',
  styleUrls: ['./alarm.page.scss'],
})
export class AlarmPage implements OnInit {
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }
  dismiss() {
    this.modalCtrl.dismiss(false);

  }

}
