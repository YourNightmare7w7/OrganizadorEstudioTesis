import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { NotesService } from 'src/app/services/notes.service';
import { Note } from 'src/app/Interfaces/notes';
import { EMPTY } from 'rxjs';
@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.page.html',
  styleUrls: ['./add-note.page.scss'],
})
export class AddNotePage implements OnInit {
  tit: string;
  content: string;
  id: string;
  nueva:boolean;

  main = this.route.snapshot.paramMap.get('title');
  public note: Note;

  constructor(
    private route: ActivatedRoute,
    private notesService: NotesService,
    private navCtrl: NavController
  ) {
    this.note = {
      id: '',
      title: '',
      content: '',
    };
  }
  async ngOnInit() {
    this.notesService.start();
    this.nueva = false;

    await this.notesService.notes.find(({ id }) => id === this.main);
    this.note = this.notesService.notes.find(({ id }) => id === this.main);
    this.tit = this.note.title;
    this.content = this.note.content;
    this.id = this.note.id;
    console.log(this.id);
    if(this.id==this.main){
      this.nueva=true
    }
  }


  async save() {
    if (this.nueva == true) {
      this.notesService.notes[(parseInt(this.id)-1)].content=this.content;
      this.notesService.notes[(parseInt(this.id)-1)].title=this.tit;

      this.nueva = false;
      this.navCtrl.back();

    } else {
      this.navCtrl.back();
      this.notesService.setValue(this.tit, this.content);
    }
  }
}
