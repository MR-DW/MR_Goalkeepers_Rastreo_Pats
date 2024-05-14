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

  urlImgLogo!: string;
  isLogged: boolean = true;
  clubParam!: string;
  club!: any;

  constructor(private loginService: LoginService,
    private _snackBar: MatSnackBar,
    private homeService: HomeService,
    private rutaActiva: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerClubParam();
    this.urlImgLogo = environment.urlImg + 'logo.png?alt=media&token=0eacfb2c-f34f-4bef-85f0-e96ae9713d44';
    this.estaLogueado();
  }

  obtenerClubParam() {
    this.rutaActiva.params.subscribe({
      next: (
        (miParam: Params) => {
          this.clubParam = miParam['club'];
          if (this.clubParam) {
            this.obtenerInfoClub();
          }
        }),
      error: (
        (error: any) => {
          const mensaje = 'No se pudo obtener la información de su club, intente nuevamente.'
          this.openSnackBar(mensaje);
        }
      )
    })
  }

  obtenerInfoClub() {
    this.homeService.getClub(this.clubParam).subscribe((resp: any) => {
      this.club = resp;
    })
  }

  estaLogueado() {
    return this.loginService.estaLogueado()
  }

  salir() {
    this.loginService.logout()
      .then(() => {
        const mensaje = 'Usted salió correctamente!'
        this.openSnackBar(mensaje);
        this.router.navigate(['/ingresar'])
      })
      .catch(() => {
        const mensaje = 'No pudo salir intente nuevamente.'
        this.openSnackBar(mensaje);
      })
  }

  openSnackBar(value: string) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      data: { mensaje: value },
      duration: 5000,
    });
  }

}
