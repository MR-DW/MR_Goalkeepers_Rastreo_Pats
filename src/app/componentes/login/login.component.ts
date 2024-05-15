import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { SnackBarComponent } from '../shared/snack-bar/snack-bar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  contrasenasIguales!: boolean;
  clubs: any[] = [];
  clubUsuarioCorrecto!: boolean;
  emailUsuarioCorrecto!: boolean;
  club!: string;
  escudoGenerico!: string;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private usuarioService: UsuarioService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      club: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.obtenerClubsRegistrados();
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

  obtenerClubUsuario() {
    const dataForm = {
      email: this.formLogin.get('email')?.value.toString(),
      club: this.formLogin.get('club')?.value.toString(),
    }
    this.club = dataForm.club.toString();

    this.usuarioService.getUsuario().subscribe({
      next: (
        (resp: any) => {
          for (let user of resp) {
            if (user.club == dataForm.club && user.email == dataForm.email) {
              this.ingresar();
            }
            else {
              const mensaje = 'Algún dato es incorrecto o su email no está registrado.'
              this.openSnackBar(mensaje);
            }
          }
        }
      ),
      error: (
        (error: any) => {
          const mensaje = 'No pudimos obtener los usuarios registrados, intente más tarde.'
          this.openSnackBar(mensaje);
        }
      )
    })
  }

  ingresar() {
    const dataForm = {
      email: this.formLogin.get('email')?.value.toString(),
      password: this.formLogin.get('password')?.value.toString(),
      club: this.formLogin.get('club')?.value.toString(),
    }
    this.loginService.login(dataForm)
      .then(resp => {
        const mensaje = 'Ingresó correctamente!'
        this.openSnackBar(mensaje);
        this.router.navigate(['/', this.club]);
      })
      .catch(error => {
        const mensaje = 'Email o contraseña incorrecta.'
        this.openSnackBar(mensaje);
      })
  }

  openSnackBar(value: string) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      data: { mensaje: value },
      duration: 5000,
    });
  }

  irARegistrarse() {
    this.router.navigate(['/registrar'])
  }

}
