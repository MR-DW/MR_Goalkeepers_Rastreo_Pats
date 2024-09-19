import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params } from '@angular/router';
import { SnackBarComponent } from 'src/app/componentes/shared/snack-bar/snack-bar.component';
import { Arqueros } from 'src/app/modelos/arqueros.model';
import { ArquerosService } from 'src/app/servicios/arqueros.service';
import { HomeService } from 'src/app/servicios/home.service';

@Component({
  selector: 'app-detalle-arqueros',
  templateUrl: './detalle-arqueros.component.html',
  styleUrls: ['./detalle-arqueros.component.scss']
})
export class DetalleArquerosComponent implements OnInit {
  idParam!: string;
  arqueros!: Arqueros;
  clubParam!: string;

  constructor(
    private arquerosService: ArquerosService, 
    private rutaActiva: ActivatedRoute,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.obtenerClubParam();
    this.obtenerIdParam();
    this.obtenerDetalleArquero(this.clubParam, this.idParam);
  }

  obtenerClubParam() {
    this.rutaActiva.params.subscribe({
      next: (
        (miParam: Params) => {
          this.clubParam = miParam['club'];
        }),
      error: (
        (error: any) => {
          const mensaje = 'No se pudo obtener la información de su arquero, intente nuevamente.'
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
          const mensaje = 'No se pudo obtener la información de su arquero, intente nuevamente.'
          this.openSnackBar(mensaje);
        }
      )
    })
  }

  obtenerDetalleArquero(club: string, id: any) {
    this.arquerosService.getDetalleArquero(club, id).subscribe({
      next: (
        (data: any) => {
          this.arqueros = new Arqueros(data);
        }
      ),
      error: (
        (error: any) => {
          const mensaje = 'No se pudo obtener la información de su arquero, intente nuevamente.'
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
