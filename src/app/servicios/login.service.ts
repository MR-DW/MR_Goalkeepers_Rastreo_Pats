import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  token!: string;
  clubDelUsuario!: string;

  constructor( private auth: Auth,  ) { }

  // Crear usuario
  registro({ email, password}:any){
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

// Login
  login({ email, password, club}:any){
    return signInWithEmailAndPassword(this.auth, email, password)
    .then( (resp) =>  {
      console.log("response: ", resp)
      this.auth.currentUser?.getIdToken()
      .then( token => {
        console.log("token: ", token)

        this.token = token;
        this.clubDelUsuario = club;
        sessionStorage.setItem('token', this.token);
        sessionStorage.setItem('clubDelUsuario', this.clubDelUsuario);
      }) 
    })
  }

  getIdToken(){
    return sessionStorage.getItem('token');
  }

  getClubUsuario(){
    return sessionStorage.getItem('clubDelUsuario');
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
