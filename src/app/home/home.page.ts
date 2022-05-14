import { FireBaseServiceService } from './../services/fire-base-service.service';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor(private navCtrl: NavController,private auth: FireBaseServiceService) {}
toNotes(){
  this.navCtrl.navigateForward('note');
}
ngOnInit(){


}

loginGoogle(){
  

}

}
