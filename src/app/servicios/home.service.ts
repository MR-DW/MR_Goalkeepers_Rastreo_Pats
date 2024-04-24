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

  firebaseUrl = 'https://mrgoalkeepers-rastreo-pats-default-rtdb.firebaseio.com';
  json = '.json';
  bolsos = '/bolsos';
  arqueros = '/arqueros';
  auth= '?auth='

  listaBolsos: Bolso[] = []
  mensajeCompoVacio: boolean | undefined;

  token = this.loginService.getIdToken();


  // Bolsos

  crearBolso( body:Bolso[] ): Observable<any>{
    
    return this.httpClient.put(this.firebaseUrl + this.bolsos + this.json + this.auth + this.token, body);
  }

  editarBolso( id:number, body:any ): Observable<any>{
    
    return this.httpClient.put(this.firebaseUrl + this.bolsos + '/' + id + this.json + this.auth + this.token, body);
  }

  getBolsos(): Observable<any>{
    return this.httpClient.get(this.firebaseUrl + this.bolsos + this.json)
  }

  getDetalleBolso(id:any): Observable<any>{
    return this.httpClient.get(this.firebaseUrl + this.bolsos + '/' + id + this.json);
  }

  eliminarBolso( id:number ): Observable<any>{
    return this.httpClient.delete(this.firebaseUrl + this.bolsos + '/' + id + this.json + this.auth + this.token);
  }


  // Arqueros
  crearArquero( body:Arqueros[] ): Observable<any>{
    return this.httpClient.put(this.firebaseUrl + this.arqueros + this.json + this.auth + this.token, body);
  }

  getArqueros(): Observable<any>{
    return this.httpClient.get(this.firebaseUrl + this.arqueros + this.json)
  }

  getDetalleArquero(id:any): Observable<any>{
    return this.httpClient.get(this.firebaseUrl + this.arqueros + '/' + id + this.json);
  }

  eliminarArquero( id:number ): Observable<any>{
    return this.httpClient.delete(this.firebaseUrl + this.arqueros + '/' + id + this.json + this.auth + this.token);
  }

}
