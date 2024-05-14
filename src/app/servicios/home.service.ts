import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private httpClient: HttpClient, 
    private loginService: LoginService,
    private urlService: UrlService
  ) { }

  // Club
  getClub(club: any): Observable<any> {
    const token = this.loginService.getIdToken();
    return this.httpClient.get(
      this.urlService.urlService.clubs + `/${club}` + this.urlService.json + this.urlService.auth + token
    );
  }

}
