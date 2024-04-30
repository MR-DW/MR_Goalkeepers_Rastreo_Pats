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

  constructor( private httpClient: HttpClient, private loginService: LoginService ) { }

  firebaseUrl = 'https://mrgoalkeepers-rastreo-pats-default-rtdb.firebaseio.com/';
  users = 'users';
  clubs = 'Clubs';
  json = '.json';
  bolsos = '/bolsos';
  arqueros = '/arqueros';
  auth= '?auth=';
  reglamento = '/reglamento';

  listaBolsos: Bolso[] = []
  mensajeCompoVacio: boolean | undefined;

  // Bolsos
  crearBolso( body:Bolso[] ): Observable<any>{    
    const token = this.loginService.getIdToken();
    return this.httpClient.put(this.firebaseUrl + this.bolsos + this.json + this.auth + token, body);
  }

  editarBolso( id:number, body:any ): Observable<any>{
    const token = this.loginService.getIdToken();
    return this.httpClient.put(this.firebaseUrl + this.bolsos + '/' + id + this.json + this.auth + token, body);
  }

  getBolsos(): Observable<any>{
    return this.httpClient.get(this.firebaseUrl + this.bolsos + this.json)
  }

  getDetalleBolso(id:any): Observable<any>{
    return this.httpClient.get(this.firebaseUrl + this.bolsos + '/' + id + this.json);
  }

  eliminarBolso( id:number ): Observable<any>{
    const token = this.loginService.getIdToken();
    return this.httpClient.delete(this.firebaseUrl + this.bolsos + '/' + id + this.json + this.auth + token );
  }


  // Arqueros
  crearArquero( body:Arqueros[] ): Observable<any>{
    const token = this.loginService.getIdToken();
    return this.httpClient.put(this.firebaseUrl + this.arqueros + this.json + this.auth + token, body);
  }

  getArqueros(): Observable<any>{
    return this.httpClient.get(this.firebaseUrl + this.arqueros + this.json)
  }

  getDetalleArquero(id:any): Observable<any>{
    return this.httpClient.get(this.firebaseUrl + this.arqueros + '/' + id + this.json);
  }

  eliminarArquero( id:number ): Observable<any>{
    const token = this.loginService.getIdToken();
    return this.httpClient.delete(this.firebaseUrl + this.arqueros + '/' + id + this.json + this.auth + token);
  }

  editarArquero( id:number, body:any ): Observable<any>{
    const token = this.loginService.getIdToken();
    return this.httpClient.put(this.firebaseUrl + this.arqueros + '/' + id + this.json + this.auth + token, body);
  }

  // Reglamento
  
  getReglamento(): Observable<any>{
    return this.httpClient.get(this.firebaseUrl + this.reglamento + this.json);
  }
  
  editarReglamento(body:any ): Observable<any>{
    const token = this.loginService.getIdToken();
    return this.httpClient.put(this.firebaseUrl + this.reglamento + '/' + this.json + this.auth + token, body);
  }


  // Usuarios
  crearUsuario(body:any): Observable<any>{
    return this.httpClient.put(this.firebaseUrl + this.users + this.json, body);
  }

  getUsuario(): Observable<any>{
    return this.httpClient.get(this.firebaseUrl + this.users + this.json);
  }

  // Club
  getClub( club:any ): Observable<any>{
    const token = this.loginService.getIdToken();
    return this.httpClient.get(this.firebaseUrl + this.clubs + `/${club}` + this.json + this.auth + token);
  }

}
