import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { NotesService } from 'src/app/services/notes.service';
import { Note } from 'src/app/Interfaces/notes';
import { EMPTY } from 'rxjs';
import { FireBaseServiceService } from 'src/app/services/fire-base-service.service';
@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.page.html',
  styleUrls: ['./add-note.page.scss'],
})
export class AddNotePage implements OnInit {
  tit: string;
  content: string;
  id: string;
  nueva: boolean;

  main = this.route.snapshot.paramMap.get('title');
  public note: Note;

  constructor(
    private route: ActivatedRoute,
    private notesService: NotesService,
    private navCtrl: NavController,
    private fire: FireBaseServiceService
  ) {
    this.note = {
      id: '',
      title: '',
      content: '',
    };
  }
  async ngOnInit() {
    this.nueva = false;
    this.note = await this.notesService.notes.find(
      ({ id }) => id === this.main
    );
    if (this.note !== undefined) {
      this.id = this.note.id;
      this.tit = this.note.title;
      this.nueva = true;

      this.content = this.note.content;
    }
  }
  delet() {
    if (this.nueva === true) {
      this.notesService.delete(this.id);
      this.navCtrl.back();
    }
  }

  async save() {
    if (this.nueva === true) {
      this.note = {
        id: this.id,
        title: this.tit,
        content: this.content,
      };
      this.fire.changeValues('Notes', this.id, this.note);
      this.navCtrl.back();
    } else {
      this.navCtrl.back();
      this.notesService.setValue(this.tit, this.content);
    }
  }
}
