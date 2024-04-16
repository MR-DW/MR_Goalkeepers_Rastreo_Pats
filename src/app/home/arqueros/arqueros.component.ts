import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Arqueros } from 'src/app/modelos/arqueros.model';
import { HomeService } from 'src/app/servicios/home.service';
import { ModalConfirmacionComponent } from 'src/app/shared/modal-confirmacion/modal-confirmacion.component';

@Component({
  selector: 'app-arqueros',
  templateUrl: './arqueros.component.html',
  styleUrls: ['./arqueros.component.scss']
})
export class ArquerosComponent implements OnInit {

  listaArqueros!: Arqueros[];
  mensajeCompoVacio: boolean = false;

  constructor(private homeService: HomeService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.obtenerListaBolsos();
  }

  obtenerListaBolsos() {
    this.homeService.getArqueros().subscribe((data: any) => {
      if (data) {
        this.listaArqueros = data;
      }
      else {
        this.mensajeCompoVacio = true;
      }
    }
    )
  }

  eliminarBolso( id:number ) {

    this.listaArqueros.splice(id, 1);

    this.homeService.crearArquero( this.listaArqueros ).subscribe();

    this.dialog.open(ModalConfirmacionComponent, {
      data: { mensaje: 'Bolso eliminado correctamente', esEliminar: true }
    });
  }
}
