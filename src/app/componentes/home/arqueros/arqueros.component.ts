import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { ModalConfirmacionComponent } from 'src/app/componentes/shared/modal-confirmacion/modal-confirmacion.component';
import { Arqueros } from 'src/app/modelos/arqueros.model';
import { ArquerosService } from 'src/app/servicios/arqueros.service';

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
    private arquerosService: ArquerosService
  ) { }

  ngOnInit(): void {
    this.obtenerClubParam();
    this.obtenerListaBolsos();
  }
  obtenerClubParam() {
    this.rutaActiva.params.subscribe((miParam: Params) => {
      this.clubParam = miParam['club'];
    })
  }

  obtenerListaBolsos() {
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

  eliminarBolso(id: number) {

    this.listaArqueros.splice(id, 1);

    this.arquerosService.crearArquero(this.clubParam, this.listaArqueros).subscribe({
      next: (
        (resp: any) => {
          this.mensajeCompoVacio = true;
          this.dialog.open(ModalConfirmacionComponent, {
            data: { mensaje: 'Bolso eliminado correctamente', esEliminar: true }
          });
        }
      ),
      error: (
        (error: any) => {
          this.dialog.open(ModalConfirmacionComponent, {
            data: { mensaje: 'Tu bolso no pudo eliminarse, intente nuevamente!', esEliminar: true }
          })
        }
      )
    })
  }
}
