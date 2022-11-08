import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { isPlatform } from '@ionic/angular';
import { first } from 'rxjs/operators';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { Note } from '../Interfaces/notes';
@Injectable({
  providedIn: 'root',
})
export class FireBaseServiceService {
  user = false;

  events: Observable<any[]>;
  notes: Observable<any[]>;

  constructor(public auth: AngularFireAuth, private fire: AngularFirestore) {}
  localUser() {
    const u = localStorage.getItem('user');

    if (u === null) {
      return false;
    } else {
      return u;
    }
  }
  async login() {
    if (!isPlatform('capacitor')) {
      return await this.loginWeb();
    } else {
      return await this.loginAndroid();
    }
  }
  async loginWeb() {
    const data = await this.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
    return await this.updateW(data.user);
  }
  async loginAndroid() {
    const googleUser = await GoogleAuth.signIn();
    console.log(googleUser);
    return await this.updateN(googleUser);
  }
  userExist(email) {
    return this.fire
      .collection('users', (ref) => ref.where('email', '==', email))
      .valueChanges()
      .pipe(first())
      .toPromise();
  }
  async updateW(user) {
    const u = JSON.parse(JSON.stringify(user));
    const exist = await this.userExist(user.email);
    let data;
    if (exist === []) {
      data = {
        uid: u.uid,
        email: u.email,
        lastLogin: new Date(),
        createdAt: new Date(),
      };
    } else {
      data = {
        uid: u.uid,
        email: user.email,
        lastLogin: new Date(),
      };
    }
    localStorage.setItem('user', JSON.stringify(data));
    const userRef = this.fire.collection('users');
    return userRef.doc(user.uid).set(data, { merge: true });
  }
  async updateN(user) {
    const exist = await this.userExist(user.email);
    let data;
    if (exist === []) {
      data = {
        uid: user.id,
        email: user.email,
        lastLogin: new Date(Number(user.lastLoginAt)) || new Date(),
        createdAt: new Date(Number(user.createdAt)) || new Date(),
      };
    } else {
      data = {
        uid: user.id,
        email: user.email,
        lastLogin: new Date(),
      };
    }
    localStorage.setItem('user', JSON.stringify(data));
    const uColl = this.fire.collection('users');
    return uColl.doc(user.id).set(data);
  }
  addData(coll, data) {
    const user = JSON.parse(this.localUser() || '');
    const notC = this.fire.collection('users').doc(user.uid).collection(coll);
    if (coll === 'Calendar') {
      notC.doc(data.id).set(data);
    } else {
      data.forEach((not) => {
        notC.doc(not.id).set(not);
      });
    }
  }
  deleteData(coll, id) {
    const user = JSON.parse(this.localUser() || '');
    const notC = this.fire
      .collection('users')
      .doc(user.uid)
      .collection(coll)
      .doc(id);
    return notC.delete();
  }

  changeValues(collection, id, data) {
    const user = JSON.parse(this.localUser() || '');
    this.fire
      .collection('users')
      .doc(user.uid)
      .collection(collection)
      .doc(id)
      .update(data);
  }
  getOne(collection,id){
    const user = JSON.parse(this.localUser() || '');
    return this.fire
    .collection('users')
    .doc(user.uid)
    .collection(collection)
    .doc(id).valueChanges();
  }
  getValues(collection) {
    const user = JSON.parse(this.localUser() || '');
    return this.fire
      .collection('users')
      .doc(user.uid)
      .collection(collection)
      .valueChanges();
  }
}
