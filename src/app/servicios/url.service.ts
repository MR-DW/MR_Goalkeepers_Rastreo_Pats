import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UrlService {

  firebaseUrl: string = 'https://mrgoalkeepers-rastreo-pats-default-rtdb.firebaseio.com/';
  users: string = 'users';
  clubs: string = 'Clubs';
  json: string = '.json';
  bolsos: string = '/bolsos';
  arqueros: string = '/arqueros';
  auth: string = '?auth=';
  reglamento: string = '/reglamento';
  clubRegistrado: string = 'clubRegistrado';


  urlService = {
    registro:{
      getClubRegistrado: this.firebaseUrl + this.clubRegistrado + this.json,
    },
    usuarios:{
      crearUsuario: this.firebaseUrl + this.users + this.json,
      getUsuario: this.firebaseUrl + this.users + this.json,
    }
  }


}
