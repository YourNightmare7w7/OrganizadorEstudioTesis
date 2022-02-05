import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { identity } from 'rxjs';
import { Note } from '../Interfaces/notes';
@Injectable({
  providedIn: 'root'
})
export class NotesService {
  public notes: Note[] = []
  public loaded: boolean = false;
  constructor(private storage: Storage) {
  }
  async start() {
    await this.storage.create();


  }

  async save() {
    await this.storage.set('notes', this.notes);
  }
  async setValue(title,content) {
    let id=Math.max(...this.notes.map(note=>parseInt(note.id)),0)+1;
    await this.notes.push({
      id: id.toString(),
      title: title,
      content: content
    });
    this.save();
  }




}
