import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";
import {User} from "../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private dataBaseStore: AngularFirestore) {
  }


  getAllUsers() {
    return this.dataBaseStore
      .collection('users', user => user.orderBy('name'))
      .valueChanges({idField: 'firebaseId'}) as Observable<User[]>
  }

  addUser(user: User) {
    this.dataBaseStore.collection('users').add(user)
      .then(() => console.log('Usuário adicionado com sucesso!'))
      .catch(error => console.error('Erro ao adicionar usuário:', error));
  }

  update(userId: string, user: User) {
    this.dataBaseStore.collection('users').doc(userId).update(user)
      .then(() => console.log('Usuário atualizado com sucesso!'))
      .catch(error => console.error('Erro ao atualizar usuário:', error));
  }

  deleteUser(userId: string) {
    this.dataBaseStore.collection('users').doc(userId).delete()
      .then(() => console.log('Usuário deletado com sucesso!'))
      .catch(error => console.error('Erro ao deletar usuário:', error));
  }

}
