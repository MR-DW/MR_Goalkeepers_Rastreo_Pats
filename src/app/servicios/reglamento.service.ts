import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class ReglamentoService {

  constructor( 
    private loginService:LoginService,
    private httpClient:HttpClient,
    private urlService:UrlService
  ) { }

  getReglamento(club: string): Observable<any> {
    const token = this.loginService.getIdToken();
    const clubUsuario = this.loginService.getClubUsuario();
    if (club == clubUsuario) {
      return this.httpClient.get(
       this.urlService.urlService.clubs + `/${club}` + this.urlService.reglamento + this.urlService.json + this.urlService.auth + token
      );
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
      return this.httpClient.put(
       this.urlService.urlService.clubs + `/${club}` + this.urlService.reglamento + this.urlService.json + this.urlService.auth + token, 
        body
      );
    } else {
      return new Observable<never>(observer => {
        observer.complete();
      });
    }
  }
}
