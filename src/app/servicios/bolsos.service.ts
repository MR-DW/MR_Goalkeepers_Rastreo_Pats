import { Injectable } from '@angular/core';
import { Bolso } from '../modelos/bolso.model';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class BolsosService {

  constructor( 
    private loginService:LoginService,
    private httpClient:HttpClient,
    private urlService:UrlService
  ) { }

  crearBolso(club: string, body: Bolso[]): Observable<any> {
    const clubUsuario = this.loginService.getClubUsuario();
    const token = this.loginService.getIdToken();
    if (club == clubUsuario) {
      return this.httpClient.put(
        this.urlService.urlService.clubs + `/${club}` + this.urlService.bolsos + this.urlService.json + this.urlService.auth + token, 
        body
      );
    } else {
      return new Observable<never>(observer => {
        observer.complete();
      });
    }
  }

  editarBolso(club: string, id: number, body: any): Observable<any> {
    const clubUsuario = this.loginService.getClubUsuario();
    const token = this.loginService.getIdToken();
    if (club == clubUsuario) {
      return this.httpClient.put(
        this.urlService.urlService.clubs + `/${club}` + this.urlService.bolsos + '/' + id + this.urlService.json + this.urlService.auth + token,
        body
      );
    } else {
      return new Observable<never>(observer => {
        observer.complete();
      });
    }
  }

  getBolsos(club: string): Observable<any> {
    const clubUsuario = this.loginService.getClubUsuario();
    const token = this.loginService.getIdToken();
    if (club == clubUsuario) {
      return this.httpClient.get(
        this.urlService.urlService.clubs + `/${club}` + this.urlService.bolsos + this.urlService.json + this.urlService.auth + token
      )
    } else {
      return new Observable<never>(observer => {
        observer.complete();
      });
    }
  }

  getDetalleBolso(club: string, id: any): Observable<any> {
    const clubUsuario = this.loginService.getClubUsuario();
    const token = this.loginService.getIdToken();
    if (club == clubUsuario) {
      return this.httpClient.get(
        this.urlService.urlService.clubs + `/${club}` + this.urlService.bolsos + '/' + id + this.urlService.json + this.urlService.auth + token
      );
    } else {
      return new Observable<never>(observer => {
        observer.complete();
      });
    }
  }

  eliminarBolso(club: string, id: number): Observable<any> {
    const clubUsuario = this.loginService.getClubUsuario();
    const token = this.loginService.getIdToken();
    if (club == clubUsuario) {
      return this.httpClient.delete(
        this.urlService.urlService.clubs + `/${club}` + this.urlService.bolsos + '/' + id + this.urlService.json + this.urlService.auth + token
      );
    } else {
      return new Observable<never>(observer => {
        observer.complete();
      });
    }
  }
}
