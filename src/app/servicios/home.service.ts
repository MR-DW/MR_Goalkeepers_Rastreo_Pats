import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor( private httpClient: HttpClient ) { }

  firebaseUrl = 'https://mrgoalkeepers-rastreo-pats-default-rtdb.firebaseio.com';
  bolsos = '/bolsos.json';
  arqueros = '/arqueros.json';

  crearBolso( body:any ): Observable<any>{
    return this.httpClient.put(this.firebaseUrl + this.bolsos, body);
  }

  getBolsos(): Observable<any>{
    return this.httpClient.get(this.firebaseUrl + this.bolsos);
  }

}
