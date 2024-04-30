import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';
import { environment } from 'src/environments/environment';
import { SnackBarComponent } from '../shared/snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HomeService } from 'src/app/servicios/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  urlImgLogo!:string;
  isLogged:boolean = true;
  clubParam!:string;

  constructor( private loginService: LoginService, private _snackBar: MatSnackBar, private homeService: HomeService, 
    private rutaActiva:ActivatedRoute
   ) { }

  ngOnInit(): void {
    this.obtenerClubParam();
    this.urlImgLogo = environment.urlImg + 'logo.png?alt=media&token=0eacfb2c-f34f-4bef-85f0-e96ae9713d44';
    this.estaLogueado();
    this.obtenerInfoClub();
  }

  obtenerClubParam(){
    this.rutaActiva.params.subscribe((miParam: Params) => {
      this.clubParam = miParam['club'];
    })
  }

  obtenerInfoClub(){
    this.homeService.getClub(this.clubParam).subscribe((resp :any) => {
      console.log("resp: ", resp)
    })
  }

  estaLogueado(){
    return this.loginService.estaLogueado()
  }

  salir(){
    this.loginService.logout()
    .then(()=>{
      const mensaje = 'Usted salió correctamente!'
      this.openSnackBar(mensaje);
    })
    .catch(()=>{
      const mensaje = 'No pudo salir intente nuevamente.'
      this.openSnackBar(mensaje);
    })
  }

  openSnackBar(value: string) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      data: { mensaje: value}, 
      duration: 5000,
    });
  }

}
