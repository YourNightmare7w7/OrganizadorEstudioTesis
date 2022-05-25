import { RelojService } from './../../../services/reloj.service';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.page.html',
  styleUrls: ['./alarm.page.scss'],
})
export class AlarmPage implements OnInit {
  id = this.route.snapshot.paramMap.get('id');

  constructor(
    private route: ActivatedRoute,
    private reloj: RelojService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {}
  dismiss() {
    this.reloj.apagar(this.id);
    this.navCtrl.back();
  }
}
