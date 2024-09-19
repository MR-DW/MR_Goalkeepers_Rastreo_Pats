import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params } from '@angular/router';
import { SnackBarComponent } from 'src/app/componentes/shared/snack-bar/snack-bar.component';
import { Bolso } from 'src/app/modelos/bolso.model';
import { BolsosService } from 'src/app/servicios/bolsos.service';

@Component({
  selector: 'app-detalle-bolsos',
  templateUrl: './detalle-bolsos.component.html',
  styleUrls: ['./detalle-bolsos.component.scss']
})
export class DetalleBolsosComponent implements OnInit {

  idParam!: string;
  bolso!: Bolso;
  clubParam!: string;

  constructor(
    private rutaActiva: ActivatedRoute,
    private bolsosService: BolsosService,
    private _snackBar: MatSnackBar,

  ) { }

  ngOnInit(): void {
    this.obtenerClubParam();
    this.obtenerIdParam();
    this.obtenerDetalleBolso(this.clubParam, this.idParam);
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

  obtenerIdParam() {
    this.rutaActiva.params.subscribe({
      next: (
        (miParam: Params) => {
          this.idParam = miParam['id'];

        }),
      error: (
        (error: any) => {
          const mensaje = 'No se pudo obtener la información de su bolso, intente nuevamente.'
          this.openSnackBar(mensaje);
        }
      )
    })
  }

  obtenerDetalleBolso(club: string, id: any) {
    this.bolsosService.getDetalleBolso(club, id).subscribe({
      next: (
        (data: any) => {
          this.bolso = new Bolso(data);
        }
      ),
      error: (
        (error: any) => {
          const mensaje = 'No se pudo obtener la información de su bolso, intente nuevamente.'
          this.openSnackBar(mensaje);
        })
    })
  }

  openSnackBar(value: string) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      data: { mensaje: value },
      duration: 5000,
    });
  }

}
