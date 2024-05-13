import { Injectable } from '@angular/core';
import { Arqueros } from '../modelos/arqueros.model';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class ArquerosService {

  constructor(
    private loginService:LoginService,
    private httpClient:HttpClient,
    private urlService:UrlService
  ) { }

  crearArquero(club: string, body: Arqueros[]): Observable<any> {
    const token = this.loginService.getIdToken();
    const clubUsuario = this.loginService.getClubUsuario();
    if (club == clubUsuario) {
      return this.httpClient.put(
        this.urlService.urlService.clubs.clubs + `/${club}` + this.urlService.arqueros + this.urlService.json + this.urlService.auth + token,
        body
      );
    } else {
      return new Observable<never>(observer => {
        observer.complete();
      });
    }
  }

  getArqueros(club: string): Observable<any> {
    const clubUsuario = this.loginService.getClubUsuario();
    const token = this.loginService.getIdToken();
    if (club == clubUsuario) {
      return this.httpClient.get(
        this.urlService.urlService.clubs.clubs + `/${club}` + this.urlService.arqueros + this.urlService.json + this.urlService.auth + token
      );
    } else {
      return new Observable<never>(observer => {
        observer.complete();
      });
    }
  }

  getDetalleArquero(club: string, id: any): Observable<any> {
    const clubUsuario = this.loginService.getClubUsuario();
    const token = this.loginService.getIdToken();
    if (club == clubUsuario) {
      return this.httpClient.get(
        this.urlService.urlService.clubs.clubs + `/${club}` + this.urlService.arqueros + '/' + id + this.urlService.json + this.urlService.auth + token
      );
    } else {
      return new Observable<never>(observer => {
        observer.complete();
      });
    }
  }

  editarArquero(club: string, id: number, body: any): Observable<any> {
    const clubUsuario = this.loginService.getClubUsuario();
    const token = this.loginService.getIdToken();
    if (club == clubUsuario) {
      return this.httpClient.put(
        this.urlService.urlService.clubs.clubs + `/${club}` + this.urlService.arqueros + '/' + id + this.urlService.json + this.urlService.auth + token, 
        body
      );
    } else {
      return new Observable<never>(observer => {
        observer.complete();
      });
    }
  }

  eliminarArquero(club: string, id: number): Observable<any> {
    const clubUsuario = this.loginService.getClubUsuario();
    const token = this.loginService.getIdToken();
    if (club == clubUsuario) {
      return this.httpClient.delete(
        this.urlService.urlService.clubs.clubs + `/${club}` + this.urlService.arqueros + '/' + id + this.urlService.json + this.urlService.auth + token);
    } else {
      return new Observable<never>(observer => {
        observer.complete();
      });
    }
  }

}
