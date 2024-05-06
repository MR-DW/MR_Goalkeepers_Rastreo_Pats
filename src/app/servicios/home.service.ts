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

  // Bolsos
  crearBolso(body: Bolso[]): Observable<any> {
    const token = this.loginService.getIdToken();
    return this.httpClient.put(this.firebaseUrl + this.bolsos + this.json + this.auth + token, body);
  }

  editarBolso(id: number, body: any): Observable<any> {
    const token = this.loginService.getIdToken();
    return this.httpClient.put(this.firebaseUrl + this.bolsos + '/' + id + this.json + this.auth + token, body);
  }

  getBolsos(club: string): Observable<any> {
    const token = this.loginService.getIdToken();
    return this.httpClient.get(this.firebaseUrl + this.clubs + `/${club}` + this.bolsos + this.json + this.auth + token)
  }

  getDetalleBolso(id: any): Observable<any> {
    return this.httpClient.get(this.firebaseUrl + this.bolsos + '/' + id + this.json);
  }

  eliminarBolso(id: number): Observable<any> {
    const token = this.loginService.getIdToken();
    return this.httpClient.delete(this.firebaseUrl + this.bolsos + '/' + id + this.json + this.auth + token);
  }


  // Arqueros
  crearArquero(club: string, body: Arqueros[]): Observable<any> {
    const token = this.loginService.getIdToken();
    const clubUsuario = this.loginService.getClubUsuario();
    if (club == clubUsuario) {
      return this.httpClient.put(this.firebaseUrl + this.clubs + `/${club}` + this.arqueros + this.json + this.auth + token, body);
    } else {
      return new Observable<never>(observer => {
        observer.complete();
      });
    }
  }

  getArqueros(club: string): Observable<any> {
    const token = this.loginService.getIdToken();
    return this.httpClient.get(this.firebaseUrl + this.clubs + `/${club}` + this.arqueros + this.json + this.auth + token)
  }

  getDetalleArquero(club: string, id: any): Observable<any> {
    const clubUsuario = this.loginService.getClubUsuario();
    const token = this.loginService.getIdToken();
    if (club == clubUsuario) {
      return this.httpClient.get(this.firebaseUrl + this.clubs + `/${club}` + this.arqueros + '/' + id + this.json + this.auth + token);
    } else {
      return new Observable<never>(observer => {
        observer.complete();
      });
    }
  }

  eliminarArquero(id: number): Observable<any> {
    const token = this.loginService.getIdToken();
    return this.httpClient.delete(this.firebaseUrl + this.arqueros + '/' + id + this.json + this.auth + token);
  }

  editarArquero( club:string, id: number, body: any): Observable<any> {
    const clubUsuario = this.loginService.getClubUsuario();
    const token = this.loginService.getIdToken();
    if (club == clubUsuario) {
    return this.httpClient.put(this.firebaseUrl + this.clubs + `/${club}` + this.arqueros + '/' + id + this.json + this.auth + token, body);
  } else {
    return new Observable<never>(observer => {
      observer.complete();
    });
  }
  }

  // Reglamento

  getReglamento(club: string): Observable<any> {
    const token = this.loginService.getIdToken();
    const clubUsuario = this.loginService.getClubUsuario();
    if (club == clubUsuario) {
      return this.httpClient.get(this.firebaseUrl + this.clubs + `/${club}` + this.reglamento + this.json + this.auth + token);
    } else {
      return new Observable<never>(observer => {
        observer.complete();
      });
    }
  }

  editarReglamento(club: string, body: any): Observable<any> {
    const token = this.loginService.getIdToken();
    const clubUsuario = this.loginService.getClubUsuario();
    if (club == clubUsuario) {
      return this.httpClient.put(this.firebaseUrl + this.clubs + `/${club}` + this.reglamento + this.json + this.auth + token, body);
    } else {
      return new Observable<never>(observer => {
        observer.complete();
      });
    }
  }


  // Usuarios
  crearUsuario(body: any): Observable<any> {
    return this.httpClient.put(this.firebaseUrl + this.users + this.json, body);
  }

  getUsuario(): Observable<any> {
    return this.httpClient.get(this.firebaseUrl + this.users + this.json);
  }

  // Club
  getClub(club: any): Observable<any> {
    const token = this.loginService.getIdToken();
    return this.httpClient.get(this.firebaseUrl + this.clubs + `/${club}` + this.json + this.auth + token);
  }

}
