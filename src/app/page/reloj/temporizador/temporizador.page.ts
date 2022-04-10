import { Component, OnInit, ViewChild } from '@angular/core';
import { IonDatetime } from '@ionic/angular';
import { format, parseISO, add } from 'date-fns';
@Component({
  selector: 'app-temporizador',
  templateUrl: './temporizador.page.html',
  styleUrls: ['./temporizador.page.scss'],
})
export class TemporizadorPage implements OnInit {

  time: any;
  constructor() {

  }

  ngOnInit() {
  }

  async onClick() {
    console.log(this.time);

  }
}
