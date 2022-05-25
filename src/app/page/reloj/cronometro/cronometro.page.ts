import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-cronometro',
  templateUrl: './cronometro.page.html',
  styleUrls: ['./cronometro.page.scss'],
})
export class CronometroPage implements OnInit {
  mseconds = 0;
  minutes = 0;
  seconds = 0;
  timer: any;
  height;
  width;
  desplazamientox;
  desplazamientoy;

  active = false;
  date = new Date();
  vueltax = 'primera';
  vueltay = 'primera';

  animation = [
    {
      transform: 'translate(-40vw, -10vh)',
    },
    {
      transform: 'translate(40vw, -10vh)',
    },
    {
      transform: 'translate(40vw, 10vh)',
    },
    {
      transform: 'translate(-40vw, 10vh)',
    },
    {
      transform: 'translate(-40vw, -10vh)',
    },
  ];
  elemA;

  constructor(public platform: Platform) {}
  ionViewDidLeave() {
    this.stop();
  }
  ngOnInit() {
    this.width = this.platform.width() * 0.4;
    this.height = this.platform.height() * 0.1;
    this.desplazamientox = (this.platform.width() * 0.8) / 25;
    this.desplazamientoy = (this.platform.height() * 0.2) / 25;

    console.log(this.desplazamientox);
  }
  increaseTime(w, h) {
    document.getElementById('cir').style.transform =
      'translate(' + -this.width + 'px,' + -this.height + 'px)';

    if (this.width > -w && this.vueltax === 'primera') {
      this.width = this.width - this.desplazamientox;
    } else if (this.height > -h && this.vueltay === 'primera') {
      this.height = this.height - this.desplazamientoy;
      this.vueltax = 'segunda';
    } else if (this.width < w) {
      this.width = this.width + this.desplazamientox;
      this.vueltay = 'segunda';
    } else if (this.height < h) {
      this.height = this.height + this.desplazamientoy;
    } else {
      this.vueltay = 'primera';
      this.vueltax = 'primera';
    }

    this.date.setMinutes(this.minutes);
    this.date.setSeconds(this.seconds);
    this.date.setMilliseconds(this.mseconds);
    const time = this.date.getTime();
    this.date.setTime(time + 10);
    this.mseconds = this.date.getMilliseconds();
    this.minutes = this.date.getMinutes();
    this.seconds = this.date.getSeconds();
  }

  start() {
    const w = this.platform.width() * 0.4;
    const h = this.platform.height() * 0.1;
    if (!this.active) {
      this.active = true;
      this.timer = setInterval(() => {
        this.increaseTime(w, h);
      }, 10);
    }
  }

  stop() {
    this.active = false;
    clearInterval(this.timer);
  }

  reset() {
    this.active = false;
    this.stop();

    document.getElementById('cir').style.transform =
      'translate(' + -0 + 'px,' + -0 + 'px)';
    this.width = this.platform.width() * 0.4;
    this.height = this.platform.height() * 0.1;
    console.log(this.width);
    console.log(this.height);
    this.vueltay = 'primera';
    this.vueltax = 'primera';
    this.mseconds = 0;
    this.minutes = 0;
    this.seconds = 0;
  }
}
