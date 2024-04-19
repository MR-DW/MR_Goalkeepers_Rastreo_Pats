import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bolso } from '../modelos/bolso.model';
import { Arqueros } from '../modelos/arqueros.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor( private httpClient: HttpClient ) { }

  firebaseUrl = 'https://mrgoalkeepers-rastreo-pats-default-rtdb.firebaseio.com';
  json = '.json';
  bolsos = '/bolsos';
  arqueros = '/arqueros';

  listaBolsos: Bolso[] = []
  mensajeCompoVacio: boolean | undefined;

  // Bolsos

  crearBolso( body:Bolso[] ): Observable<any>{
    return this.httpClient.put(this.firebaseUrl + this.bolsos + this.json, body);
  }

  editarBolso( id:number, body:any ): Observable<any>{
    return this.httpClient.put(this.firebaseUrl + this.bolsos + '/' + id + this.json, body);
  }

  getBolsos(): Observable<any>{
    return this.httpClient.get(this.firebaseUrl + this.bolsos + this.json)
  }

  getDetalleBolso(id:any): Observable<any>{
    return this.httpClient.get(this.firebaseUrl + this.bolsos + '/' + id + this.json);
  }

  eliminarBolso( id:number ): Observable<any>{
    return this.httpClient.delete(this.firebaseUrl + this.bolsos + '/' + id + this.json);
  }


  // Arqueros
  crearArquero( body:Arqueros[] ): Observable<any>{
    return this.httpClient.put(this.firebaseUrl + this.arqueros + this.json, body);
  }

  getArqueros(): Observable<any>{
    return this.httpClient.get(this.firebaseUrl + this.arqueros + this.json)
  }

  getDetalleArquero(id:any): Observable<any>{
    return this.httpClient.get(this.firebaseUrl + this.arqueros + '/' + id + this.json);
  }

  eliminarArquero( id:number ): Observable<any>{
    return this.httpClient.delete(this.firebaseUrl + this.arqueros + '/' + id + this.json);
  }

}
