import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private auth: Auth ) { }

  // Crear usuario
  registro({ email, password}:any  ){
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  

}
