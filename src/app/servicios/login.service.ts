import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { UrlService } from './url.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  token!: string;
  clubDelUsuario!: string;

  constructor( private auth: Auth, private httpClient:HttpClient, private urlService: UrlService ) { }

  // Registro

  getClubsRegistrados():Observable<any>{
    return this.httpClient.get( this.urlService.urlService.registro.getClubRegistrado );
  }

  registro({ email, password}:any){
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

// Login
  login({ email, password, club}:any){
    return signInWithEmailAndPassword(this.auth, email, password)
    .then( (resp) =>  {
      this.auth.currentUser?.getIdToken()
      .then( token => {
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
      this.clubDelUsuario = '';
      sessionStorage.setItem('token', this.token);
      sessionStorage.setItem('clubDelUsuario', this.clubDelUsuario);
      window.location.reload();
    })
  }

}
