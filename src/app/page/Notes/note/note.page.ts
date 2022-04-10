import { AlertController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/services/notes.service';
@Component({
  selector: 'app-note',
  templateUrl: './note.page.html',
  styleUrls: ['./note.page.scss'],
})
export class NotePage implements OnInit {
  constructor(
    private navCtrl: NavController,
    public notesService: NotesService
  ) {}

  ngOnInit() {}
  addNote() {
    this.navCtrl.navigateForward(['/tabs/note/', 'newNote']);
  }
}
