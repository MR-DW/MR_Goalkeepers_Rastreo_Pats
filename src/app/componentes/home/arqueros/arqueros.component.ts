import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Arqueros } from 'src/app/modelos/arqueros.model';
import { HomeService } from 'src/app/servicios/home.service';
import { ModalConfirmacionComponent } from 'src/app/componentes/shared/modal-confirmacion/modal-confirmacion.component';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-arqueros',
  templateUrl: './arqueros.component.html',
  styleUrls: ['./arqueros.component.scss']
})
export class ArquerosComponent implements OnInit {

  listaArqueros!: Arqueros[];
  mensajeCompoVacio: boolean = false;
  clubParam!:string;

  constructor(
    private homeService: HomeService, 
    public dialog: MatDialog, 
    private rutaActiva:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.obtenerClubParam();
    this.obtenerListaBolsos();
  }
  obtenerClubParam(){
    this.rutaActiva.params.subscribe((miParam: Params) => {
      this.clubParam = miParam['club'];
      console.log("This.clubParam: ", this.clubParam)
    })
  }

  obtenerListaBolsos() {
    this.homeService.getArqueros(this.clubParam).subscribe((data: any) => {
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
