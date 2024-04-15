import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UrlService {

  firebaseUrl = 'https://mrgoalkeepers-rastreo-pats-default-rtdb.firebaseio.com';
  paramJson = '/datos.json'

  serviceUrl = {
    Home: {
      Bolso: {
        CrearBolso: this.firebaseUrl + this.paramJson;
      }
    }
  }


}
