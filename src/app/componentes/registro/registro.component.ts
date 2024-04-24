import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';
import { SnackBarComponent } from '../shared/snack-bar/snack-bar.component';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  formRegistro!:FormGroup;
  contrasenasIguales!: boolean;
  
  constructor( 
    private fb:FormBuilder, 
    private loginService: LoginService, 
    private router:Router,
    private _snackBar: MatSnackBar,
  ) {

    this.formRegistro = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)] ],
      contrasena: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)] ],
    })

   }

  ngOnInit(): void {
  }

  registrarse(){

    this.contrasenasIguales = this.formRegistro.get('password')?.value.toString() === this.formRegistro.get('contrasena')?.value.toString();

    const dataForm = {
      email: this.formRegistro.get('email')?.value.toString(),
      password: this.formRegistro.get('password')?.value.toString(),
    }

    this.loginService.registro(dataForm)
    .then( resp => {

      const mensaje = 'Se registró correctamente!'
      this.openSnackBar(mensaje);

      this.router.navigate(['/ingresar']);  
    })

    .catch(error => {
      const mensaje = 'No pudo registrarse, intente nuevamente.'
      this.openSnackBar(mensaje);
    })
  }

  openSnackBar(value: string) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      data: { mensaje: value}, 
      duration: 5000,
    });
  }

  irHome(){
    this.router.navigate(['/'])
  }

}
