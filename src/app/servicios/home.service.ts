import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bolso } from '../modelos/bolso.model';
import { Arqueros } from '../modelos/arqueros.model';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private httpClient: HttpClient, private loginService: LoginService) { }

  firebaseUrl = 'https://mrgoalkeepers-rastreo-pats-default-rtdb.firebaseio.com/';
  users = 'users';
  clubs = 'Clubs';
  json = '.json';
  bolsos = '/bolsos';
  arqueros = '/arqueros';
  auth = '?auth=';
  reglamento = '/reglamento';

  listaBolsos: Bolso[] = []
  mensajeCompoVacio: boolean | undefined;

  // Club
  getClub(club: any): Observable<any> {
    const token = this.loginService.getIdToken();
    return this.httpClient.get(this.firebaseUrl + this.clubs + `/${club}` + this.json + this.auth + token);
  }

}
