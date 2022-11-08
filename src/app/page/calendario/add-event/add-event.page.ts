import { FireBaseServiceService } from './../../../services/fire-base-service.service';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { format, add } from 'date-fns';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.page.html',
  styleUrls: ['./add-event.page.scss'],
})
export class AddEventPage implements OnInit {
  @Input() date: any;
  @Input() event: boolean;
  color: string;
  a = new Date();
  title: string;
  start: string;
  end: string;
  allday: boolean;
  day;
  repeat;

  constructor(private modalCtrl: ModalController,private fire: FireBaseServiceService) {}
  ngOnInit() {
    this.getDay(this.date.start);
    this.color = this.date.backgroundColor || '#C1AE7C';
    this.title = this.date.title;
    this.allday = this.date.allDay;
    this.fire.getOne('Calendar',this.date.id).subscribe((i)=>{
     if(i!==undefined&&i.rrule!==undefined){
        this.repeat=i.rrule.freq;
        this.end=format(new Date(1000*i.end.seconds), 'yyyy-MM-dd\'T\'HH:mm');
      }
    });
    if (this.date.end === undefined) {
      this.start = format(this.date.date, 'yyyy-MM-dd\'T\'HH:mm');
      const ad = add(new Date(this.start), {
        hours: 1,
      });
      this.end = format(ad, 'yyyy-MM-dd\'T\'HH:mm');
    } else if (this.date.end === null) {
      this.start = format(this.date.start, 'yyyy-MM-dd\'T\'HH:mm');
    } else {

      this.start = format(this.date.start, 'yyyy-MM-dd\'T\'HH:mm');
      this.end = format(this.date.end, 'yyyy-MM-dd\'T\'HH:mm');
    }
  }
  getDay(dat) {
    const d = dat.getDay();
    switch (d) {
      case 0:
        this.day = 'domingo';
        break;
      case 1:
        this.day = 'lunes';
        break;
      case 2:
        this.day = 'martes';
        break;
      case 3:
        this.day = 'miércoles';
        break;
      case 4:
        this.day = 'jueves';
        break;
      case 5:
        this.day = 'viernes';
        break;
      case 6:
        this.day = 'sábado';
        break;
    }
  }
  rep(){
    if(this.repeat==='daily'){

      const rrule={
        freq: this.repeat,
        byweekday: [new Date(this.start).getUTCDay()-1],
      };
      return rrule;
    }
  }
  async close() {
    const a=this.rep();
    console.log(this.color);
    const s = new Date(this.start);
    const e = new Date(this.end);

    await this.modalCtrl.dismiss([this.title, this.allday, s, e, this.color,a]);
  }
  async delet() {
    await this.modalCtrl.dismiss('delete');
  }
}
