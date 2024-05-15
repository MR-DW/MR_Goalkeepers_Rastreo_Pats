import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { SnackBarComponent } from '../shared/snack-bar/snack-bar.component';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  clubs: any[] = [];
  usuarios: any[] = [];
  formRegistro!: FormGroup;
  contrasenasIguales!: boolean;
  escudoGenerico!: string;


  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private usuarioService: UsuarioService,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) {
    this.formRegistro = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
      contrasena: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
      club: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.obtenerClubsRegistrados();
    this.obtenerClubUsuario();
    this.escudoGenerico = "https://firebasestorage.googleapis.com/v0/b/mrgoalkeepers-rastreo-pats.appspot.com/o/escudosClubs%2Fescudo-generico.png?alt=media&token=94baea87-fc76-434b-bbc0-4579fb6b772d"
  }

  obtenerClubsRegistrados() {
    this.loginService.getClubsRegistrados().subscribe({
      next: (
        (data: any) => {
          data.map((club: any) => {
            this.clubs.push(club);
          })
        }
      ),
      error: (
        (error: any) => {
          const mensaje = 'No se pudo obtener los clubs registrados, intente ingresar más tarde.'
          this.openSnackBar(mensaje);
        }
      )
    })
  }

  registrarse() {

    this.contrasenasIguales = this.formRegistro.get('password')?.value.toString() === this.formRegistro.get('contrasena')?.value.toString();

    const dataForm = {
      email: this.formRegistro.get('email')?.value.toString(),
      password: this.formRegistro.get('password')?.value.toString(),
    }

    if (this.contrasenasIguales) {
      this.loginService.registro(dataForm)
        .then(resp => {

          const mensaje = 'Se registró correctamente!'
          this.openSnackBar(mensaje);
          this.saveUsuario();
          this.router.navigate(['/ingresar']);

        })

        .catch(error => {
          const mensaje = 'No pudo registrarse, intente nuevamente.'
          this.openSnackBar(mensaje);
        })
    }
    else {
      const mensaje = 'Sus contraseñas no coinciden. Intente nuevamente.'
      this.openSnackBar(mensaje);
    }

  }

  obtenerClubUsuario() {

    this.usuarioService.getUsuario().subscribe((resp) => {
      if (resp) {
        resp.map((x: any) => {
          this.usuarios.push(x)
        })
      }
    })
  }

  saveUsuario() {
    const dataForm = {
      email: this.formRegistro.get('email')?.value.toString(),
      club: this.formRegistro.get('club')?.value.toString(),
    }
    this.usuarios.push(dataForm)
    this.usuarioService.crearUsuario(this.usuarios).subscribe((data: any) => { })
  }

  openSnackBar(value: string) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      data: { mensaje: value },
      duration: 5000,
    });
  }

  irHome() {
    this.router.navigate(['/'])
  }

}
