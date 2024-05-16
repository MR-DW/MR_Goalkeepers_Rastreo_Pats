import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( private httpClient: HttpClient, private urlService: UrlService) { }

  crearUsuario(body: any): Observable<any> {
    return this.httpClient.put( this.urlService.urlService.usuarios.crearUsuario, body);
  };

  getUsuario(): Observable<any> {
    return this.httpClient.get( this.urlService.urlService.usuarios.getUsuario );
  }
}
