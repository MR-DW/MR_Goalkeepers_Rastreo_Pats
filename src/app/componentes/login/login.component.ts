import { Component, OnInit } from '@angular/core';
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
  clubs: string[] = [];
  clubUsuarioCorrecto!: boolean;
  emailUsuarioCorrecto!: boolean;
  club!: string;

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
  }

  obtenerClubsRegistrados() {
    this.loginService.getClubsRegistrados().subscribe((data: any) => {
      data.map((club: any) => {
        this.clubs.push(club.clubRegistrado);
      })
    })
  }

  obtenerClubUsuario() {
    const dataForm = {
      email: this.formLogin.get('email')?.value.toString(),
      club: this.formLogin.get('club')?.value.toString(),
    }
    this.club = dataForm.club.toString();

    this.usuarioService.getUsuario().subscribe((x) => {
      for (let user of x) {
        if (user.club == dataForm.club && user.email == dataForm.email) {
          this.clubUsuarioCorrecto = true;
          this.emailUsuarioCorrecto = true;
        }
        else {
          this.clubUsuarioCorrecto = false;
          this.emailUsuarioCorrecto = false;
        }
      }
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

  volveralHome() {
    this.router.navigate(['/'])
  }

}
