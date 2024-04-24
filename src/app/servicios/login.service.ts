import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  ingreso:boolean = false;

  constructor( private auth: Auth ) { }

  // Crear usuario
  registro({ email, password}:any){
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login({ email, password}:any){
    this.ingreso = true;
    return signInWithEmailAndPassword(this.auth, email, password)
  }

  logout(){
    this.ingreso = false;
    return signOut(this.auth);
  }

}
