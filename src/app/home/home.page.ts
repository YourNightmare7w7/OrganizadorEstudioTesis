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

ngOnInit(){
  this.exist();


}
ionViewDidEnter(){
  this.exist();
}
exist(){
  const exist = this.auth.localUser();
  if(exist!==false){
  this.navCtrl.navigateForward('tabs/note');
  }
}

async loginGoogle(){
  const a =await  this.auth.login();
  if(a=== undefined){
  this.navCtrl.navigateForward('tabs/note');

  }

}

}
