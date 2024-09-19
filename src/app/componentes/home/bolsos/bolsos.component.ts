import { Component, OnInit } from '@angular/core';
import { Storage, deleteObject, ref } from '@angular/fire/storage';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params } from '@angular/router';
import { ModalConfirmacionComponent } from 'src/app/componentes/shared/modal-confirmacion/modal-confirmacion.component';
import { Bolso } from 'src/app/modelos/bolso.model';
import { BolsosService } from 'src/app/servicios/bolsos.service';
import { SnackBarComponent } from '../../shared/snack-bar/snack-bar.component';

@Component({
  selector: 'app-bolsos',
  templateUrl: './bolsos.component.html',
  styleUrls: ['./bolsos.component.scss']
})
export class BolsosComponent implements OnInit {

  listaBolsos!: Bolso[];
  mensajeCompoVacio: boolean = false;
  bolsoEliminado!: any;
  clubParam!: string;

  constructor(
    public dialog: MatDialog,
    private storage: Storage,
    private rutaActiva: ActivatedRoute,
    private bolsosService: BolsosService,
    private _snackBar: MatSnackBar,

  ) { }

  ngOnInit(): void {
    this.obtenerClubParam();
    this.obtenerListaBolsos();
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

  obtenerListaBolsos() {
    this.bolsosService.getBolsos(this.clubParam).subscribe({
      next: (
        (data: any) => {
          if (data) {
            this.listaBolsos = data;
          }
          else {
            this.mensajeCompoVacio = true;
          }
        }
      ),
      error: (
        (error:any) => {
          const mensaje = 'No pudimos obtener los bolsos del tu club, intente más tarde.'
          this.openSnackBar(mensaje);
        }
      )
    }

    )
  }

  eliminarBolso(id: number) {

    this.bolsoEliminado = this.listaBolsos.splice(id, 1);

    this.eliminarImagenBolso();

    this.bolsosService.crearBolso(this.clubParam, this.listaBolsos).subscribe({
      next: (
        (resp: any) => {
          this.dialog.open(ModalConfirmacionComponent, {
            data: { mensaje: 'Bolso eliminado correctamente', esEliminar: true }
          });
          if( this.listaBolsos.length < 1 ){
            this.mensajeCompoVacio = true;
          }
        }
      ),
      error: (
        (error: any) => {
          this.dialog.open(ModalConfirmacionComponent, {
            data: { mensaje: 'Tu bolso no pudo eliminarse, intente nuevamente!', esEliminar: true }
          })
        }
      )
    });

  }

  eliminarImagenBolso() {

    this.bolsoEliminado.map((prop: any) => {
      let pedasos = prop.urlImgEquipamiento.split('?');
      let pathParte = pedasos[0].split('%2F');
      let pathImg = pathParte ? pathParte[1] : null;

      const deleteRef = ref(this.storage, `bolsos/${pathImg}`);

      // No le tengo que mostrar mensaje al usuario por que se borra img por código.
      deleteObject(deleteRef)
        .then(resp => { })
        .catch(error => {  })

    })

  }

  openSnackBar(value: string) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      data: { mensaje: value },
      duration: 5000,
    });
  }

}
