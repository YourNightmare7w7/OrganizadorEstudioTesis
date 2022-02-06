import { NotesService } from './../services/notes.service';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor(private navCtrl:NavController, private notesService: NotesService) {}
toNotes(){
  this.navCtrl.navigateForward('note')
}
ngOnInit(){
  this.notesService.start()

}

}
