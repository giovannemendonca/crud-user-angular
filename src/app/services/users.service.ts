import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private dataBaseStore: AngularFirestore) {
  }


  getAllUsers() {
    return this.dataBaseStore
      .collection('users', user => user.orderBy('name'))
      .valueChanges({idField: 'firebaseId'}) as Observable<any[]>
  }

  addUser(user: any) {
    this.dataBaseStore.collection('users').add(user)
  }

  update(userId: string, user: any) {
    this.dataBaseStore.collection('user').doc(userId).update(user)
  }

  deleteUser(userId: string) {
    this.dataBaseStore.collection('user').doc(userId).delete()
  }

}
