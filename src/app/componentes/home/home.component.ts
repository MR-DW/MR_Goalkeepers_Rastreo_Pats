import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';
import { environment } from 'src/environments/environment';
import { SnackBarComponent } from '../shared/snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  urlImgLogo!:string;
  isLogged:boolean = true;
  constructor( private loginService: LoginService, private _snackBar: MatSnackBar ) { }

  ngOnInit(): void {
    this.urlImgLogo = environment.urlImg + 'logo.png?alt=media&token=0eacfb2c-f34f-4bef-85f0-e96ae9713d44';
  }

  salir(){
    this.loginService.logout()
    .then(()=>{
      const mensaje = 'Usted salió correctamente!'
      this.openSnackBar(mensaje);
      this.isLogged = this.loginService.ingreso;
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
