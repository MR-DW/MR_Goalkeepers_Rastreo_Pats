import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-botones-navegacion',
  templateUrl: './botones-navegacion.component.html',
  styleUrls: ['./botones-navegacion.component.scss']
})
export class BotonesNavegacionComponent implements OnInit {

  @Input() urlVolver: any | undefined;
  @Input() urlHomeOCrear: any | undefined;
  @Input() textoVolver: string | undefined;
  @Input() textoHomeOCrear: string | undefined;

  @Output() cancelarImg: EventEmitter<any> = new EventEmitter();

  esHome: boolean = false;
  clubParam!: string;


  constructor(
    private router: Router, 
    private rutaActiva: ActivatedRoute,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.obtenerClubParam();
    this.esHome = this.router.url == `/${this.clubParam}`
  }

  obtenerClubParam() {
    this.rutaActiva.params.subscribe({
      next: (
        (miParam: Params) => {
          this.clubParam = miParam['club'];
        }),
      error: (
        (error: any) => {
          const mensaje = 'No se pudo obtener la información de su bolso, intente nuevamente.'
          this.openSnackBar(mensaje);
        }
      )
    })
  }

  openSnackBar(value: string) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      data: { mensaje: value },
      duration: 5000,
    });
  }

  cancelar() {
    this.cancelarImg.emit();
  }

}
