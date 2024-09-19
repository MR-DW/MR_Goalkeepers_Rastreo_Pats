import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { ModalConfirmacionComponent } from 'src/app/componentes/shared/modal-confirmacion/modal-confirmacion.component';
import { Arqueros } from 'src/app/modelos/arqueros.model';
import { ArquerosService } from 'src/app/servicios/arqueros.service';
import { SnackBarComponent } from '../../shared/snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-arqueros',
  templateUrl: './arqueros.component.html',
  styleUrls: ['./arqueros.component.scss']
})
export class ArquerosComponent implements OnInit {

  listaArqueros!: Arqueros[];
  mensajeCompoVacio: boolean = false;
  clubParam!: string;

  constructor(
    public dialog: MatDialog,
    private rutaActiva: ActivatedRoute,
    private arquerosService: ArquerosService,
    private _snackBar: MatSnackBar,

  ) { }

  ngOnInit(): void {
    this.obtenerClubParam();
    this.obtenerListaArqueros();
  }

  obtenerClubParam() {
    this.rutaActiva.params.subscribe({
      next: (
        (miParam: Params) => {
          this.clubParam = miParam['club'];
        }),
      error: (
        (error: any) => {
          const mensaje = 'No se pudo obtener la información de su club, intente nuevamente.'
          this.openSnackBar(mensaje);
        }
      )
    })
  }

  obtenerListaArqueros() {
    this.arquerosService.getArqueros(this.clubParam).subscribe({
      next: (
        (data: any) => {
          if (data) {
            this.listaArqueros = data;
          }
          else {
            this.mensajeCompoVacio = true;
          }
        }
      ),
      error: (
        (error:any)=>{
          this.mensajeCompoVacio = true;
          this.dialog.open(ModalConfirmacionComponent, {
            data: { mensaje: 'No pudimos cargar tus bolsos, por favor vuelva a la home e ingrese nuevamente.', esEliminar: false }
          });
        }
      )
    })
  }

  eliminarArquero(id: number) {

    this.listaArqueros.splice(id, 1);

    this.arquerosService.crearArquero(this.clubParam, this.listaArqueros).subscribe({
      next: (
        (resp: any) => {
          this.dialog.open(ModalConfirmacionComponent, {
            data: { mensaje: 'Arquero eliminado correctamente', esEliminar: true }
          });
          if( this.listaArqueros.length < 1 ){
            this.mensajeCompoVacio = true;
          }
        }
      ),
      error: (
        (error: any) => {
          this.dialog.open(ModalConfirmacionComponent, {
            data: { mensaje: 'Tu arquero no pudo eliminarse, intente nuevamente!', esEliminar: true }
          })
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
  
}
