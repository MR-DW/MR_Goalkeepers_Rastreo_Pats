import { Component, OnInit } from '@angular/core';
import { Storage, deleteObject, getDownloadURL, listAll, ref } from '@angular/fire/storage';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmacionComponent } from 'src/app/componentes/shared/modal-confirmacion/modal-confirmacion.component';
import { Bolso } from 'src/app/modelos/bolso.model';
import { HomeService } from 'src/app/servicios/home.service';

@Component({
  selector: 'app-bolsos',
  templateUrl: './bolsos.component.html',
  styleUrls: ['./bolsos.component.scss']
})
export class BolsosComponent implements OnInit {

  listaBolsos!: Bolso[];
  mensajeCompoVacio: boolean = false;

  constructor(
    private homeService: HomeService, 
    public dialog: MatDialog, 
    private storage: Storage
  ) { }

  ngOnInit(): void {
    this.obtenerListaBolsos();
  }

  obtenerListaBolsos() {
    this.homeService.getBolsos().subscribe((data: any) => {
      if (data) {
        this.listaBolsos = data;
      }
      else {
        this.mensajeCompoVacio = true;
      }
    }
    )
  }

  eliminarBolso( id:number ) {

    this.listaBolsos.splice(id, 1);

    this.homeService.crearBolso( this.listaBolsos ).subscribe();

    this.dialog.open(ModalConfirmacionComponent, {
      data: { mensaje: 'Bolso eliminado correctamente', esEliminar: true }
    });

    this.eliminarImagen();
  }

  // Eliminar Foto

  eliminarImagen(){

    // deleteObject()

  }

}
