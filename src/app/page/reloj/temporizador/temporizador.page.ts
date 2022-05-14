import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-temporizador',
  templateUrl: './temporizador.page.html',
  styleUrls: ['./temporizador.page.scss'],
})
export class TemporizadorPage implements OnInit {
  public show = true;
  public disabled = false;
  public animate = false;
  public hours = 0;
  public minutes = 0;
  public seconds = 0;
  private timer: any;
  private date = new Date();

  constructor() {}

  ngOnInit() {}
  increment(type: 'H' | 'M' | 'S') {
    if (type === 'H') {
        return (this.hours++);
    } else if (type === 'M') {
        return (this.minutes++);
    } else {
        return (this.seconds++);
    }
  }
  decrement(type: 'H' | 'M' | 'S') {
    if (type === 'H') {
      if (this.hours !== 0) {
        return (this.hours--);
      }
    } else if (type === 'M') {
      if (this.minutes !==  0) {
        return (this.minutes--);
      }
    } else {
      if (this.seconds !==  0) {
        return (this.seconds--);
      }
    }
  }

  updateTimer() {
    this.date.setHours(this.hours);
    this.date.setMinutes(this.minutes);
    this.date.setSeconds(this.seconds);
    this.date.setMilliseconds(0);
    const time = this.date.getTime();
    this.date.setTime(time - 1000); //---

    this.hours = this.date.getHours();
    this.minutes = this.date.getMinutes();
    this.seconds = this.date.getSeconds();

    if (
      this.date.getHours() === 0 &&
      this.date.getMinutes() === 0 &&
      this.date.getSeconds() === 0
    ) {
      //stop interval
      clearInterval(this.timer);
      //this.idAudio.nativeElement.play();
      this.animate = true;
      setTimeout(() => {
        this.stop();
        //this.idAudio.nativeElement.load();
      }, 5000);
    }
  }

  start() {
   if(this.disabled!==true){
    if (this.hours > 0 || this.minutes > 0 || this.seconds > 0) {
      this.disabled = true;
      this.show = false; //hide btn + and -
      this.updateTimer();

      if (this.seconds > 0) {
        this.timer = setInterval(() => {
          this.updateTimer();
        }, 1000);
      }
    }
   }
  }

  stop() {
    this.disabled = false;
    this.show = true;
    this.animate = false;
    clearInterval(this.timer);
    //this.idAudio.nativeElement.load();
  }

  reset() {
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.stop();
  }
}
