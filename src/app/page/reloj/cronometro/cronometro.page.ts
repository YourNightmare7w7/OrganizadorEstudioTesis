import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cronometro',
  templateUrl: './cronometro.page.html',
  styleUrls: ['./cronometro.page.scss'],
})
export class CronometroPage implements OnInit {
mseconds=0;
minutes=0;
seconds=0;
timer: any;
 date= new Date();

  constructor() { }

  ngOnInit() {

  }
  updateTimer(){
    this.date.setMinutes(this.minutes);
    this.date.setSeconds(this.seconds);
    this.date.setMilliseconds(this.mseconds);
    const time = this.date.getTime();
    this.date.setTime(time+10);
    this.mseconds = this.date.getMilliseconds();
    this.minutes = this.date.getMinutes();
    this.seconds = this.date.getSeconds();

  }

  start(){
    this.timer= setInterval(()=>{
      this.updateTimer();
    },10);
  }

  stop(){
    clearInterval(this.timer);

  }

  reset() {
    this.mseconds = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.stop();
  }
}
