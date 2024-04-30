import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';
import { SnackBarComponent } from '../shared/snack-bar/snack-bar.component';
import { HomeService } from 'src/app/servicios/home.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin!:FormGroup;
  contrasenasIguales!: boolean;
  clubs: string[] = ['LaSalle', 'Tala'];
  clubUsuarioCorrecto!:boolean;
  emailUsuarioCorrecto!:boolean;
  
  constructor( 
    private fb:FormBuilder, 
    private loginService: LoginService, 
    private router:Router,
    private _snackBar: MatSnackBar,
    private homeService: HomeService
  ) {

    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)] ],
      club: ['', [Validators.required]],
    })

   }

  ngOnInit(): void {
  }

  obtenerClubUsuario(){

    const dataForm = {
      email: this.formLogin.get('email')?.value.toString(),
      club: this.formLogin.get('club')?.value.toString(),
    }

    console.log("dataForm: ", dataForm)
    this.homeService.getUsuario().subscribe((x)=>{
      console.log("x: ", x)

      if(x.club == dataForm.club && x.email == dataForm.email){
        this.clubUsuarioCorrecto = true;
        this.emailUsuarioCorrecto = true;
      }
      else{
        this.clubUsuarioCorrecto = false;
        this.emailUsuarioCorrecto = false;
      }
    })
  }

  ingresar(){

    const dataForm = {
      email: this.formLogin.get('email')?.value.toString(),
      password: this.formLogin.get('password')?.value.toString(),
    }

    this.loginService.login(dataForm)
    .then( resp => {
      const mensaje = 'Ingresó correctamente!'
      this.openSnackBar(mensaje);
      this.router.navigate(['/']);  
    })
    .catch(error => {
      const mensaje = 'Email o contraseña incorrecta.'
      this.openSnackBar(mensaje);
    })
  }

  openSnackBar(value: string) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      data: { mensaje: value}, 
      duration: 5000,
    });
  }

  irARegistrarse(){
    this.router.navigate(['/registrar'])
  }

  volveralHome(){
    this.router.navigate(['/'])
  }

}
