import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bolso } from '../modelos/bolso.model';

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


  crearBolso( body:Bolso[] ): Observable<any>{
    return this.httpClient.put(this.firebaseUrl + this.bolsos + this.json, body);
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


  setBolso( listaBolso: Bolso[]){
    this.listaBolsos = listaBolso;
  }

}
