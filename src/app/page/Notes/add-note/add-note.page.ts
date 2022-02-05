
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { NotesService } from 'src/app/services/notes.service';
import { Note } from 'src/app/Interfaces/notes';
@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.page.html',
  styleUrls: ['./add-note.page.scss'],
})
export class AddNotePage implements OnInit {
  tit: string;
  content: string;
id:string;
  main = this.route.snapshot.paramMap.get('title');
  public note:  Note;


  constructor(
    private route: ActivatedRoute,
    private notesService: NotesService,
    private navCtrl: NavController
  ) {this.note = {
    id:'',
    title: '',
    content: ''
  };}
  async ngOnInit() {
    this.notesService.start();
    await this.notesService.notes.find(({id})=>id===this.main);
    this.note=this.notesService.notes.find(({id})=>id===this.main);
    this.tit=this.note.title;
    this.content=this.note.content;
    this.id=this.note.id;
    console.log(this.id)

  }

  async save() {

    this.navCtrl.back();
    this.notesService.setValue(this.tit, this.content);


  }
}
