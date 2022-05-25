import { FireBaseServiceService } from './fire-base-service.service';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { identity, Observable } from 'rxjs';
import { Note } from '../Interfaces/notes';
@Injectable({
  providedIn: 'root',
})
export class NotesService {
  public notes: Note[] = [];

  public loaded: boolean;
  constructor(private fire: FireBaseServiceService) {
    this.start();
  }
  start() {
    this.fire.getValues('Notes').subscribe((note) => {
      this.saveV(note);
    });
  }
  saveV(data) {
    this.notes = data;
  }

  save() {
    this.fire.addData('Notes', this.notes);
  }

  async setValue(title, content) {
    const id =
      Math.max(...this.notes.map((note) => parseInt(note.id, 10)), 0) + 1;
    await this.notes.push({
      id: id.toString(),
      title,
      content,
    });
    this.save();
  }

  async delete(id) {
    const iDelete = this.notes.findIndex((e) => e.id === id);
    console.log(iDelete);
    this.notes.splice(iDelete, 1);
    this.fire.deleteData('Notes', id);
    this.save();
  }
}
