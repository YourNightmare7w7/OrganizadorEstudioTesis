import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { format, add } from 'date-fns';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.page.html',
  styleUrls: ['./add-event.page.scss'],
})
export class AddEventPage implements OnInit {
  @Input () date: any;
  a = new Date();
  title: string;
  start: string;
  end: string;
  allday: boolean;

  constructor(private modalCtrl: ModalController) { }
  ngOnInit() {
    this.allday= this.date.allDay;
    if(this.date.end===undefined){
      this.start=format(this.date.date,'yyyy-MM-dd\'T\'HH:mm');
      const ad=add(new Date(this.start),{
        hours:1
      });
      this.end=format(ad,'yyyy-MM-dd\'T\'HH:mm');

    }else{
      this.start=format(this.date.start,'yyyy-MM-dd\'T\'HH:mm');
    this.end=format(this.date.end,'yyyy-MM-dd\'T\'HH:mm');
    }
    console.log(this.date);

  }

  async close(){
    const s=new Date(this.start);
    const e=new Date(this.end);

    await this.modalCtrl.dismiss([this.title,this.allday,s,e]);
  }

}
