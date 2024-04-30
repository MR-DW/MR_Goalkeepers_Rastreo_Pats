import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  token!: string;

  constructor( private auth: Auth,  ) { }

  // Crear usuario
  registro({ email, password}:any){
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

// Login
  login({ email, password}:any){
    return signInWithEmailAndPassword(this.auth, email, password)
    .then( (resp) =>  {
      this.auth.currentUser?.getIdToken()
      .then( token => {

        this.token = token
        sessionStorage.setItem('token', this.token);

      }) 
    })
  }

  getIdToken(){
    return sessionStorage.getItem('token');

  }

  estaLogueado(){
    return sessionStorage.getItem('token');
  }

  logout(){
    return signOut(this.auth)
    .then(()=>{
      this.token = '';
      sessionStorage.setItem('token', this.token);
      window.location.reload();
    })
  }

}
