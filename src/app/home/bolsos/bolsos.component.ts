import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Bolso } from 'src/app/modelos/bolso.model';
import { HomeService } from 'src/app/servicios/home.service';
import { ModalConfirmacionComponent } from 'src/app/shared/modal-confirmacion/modal-confirmacion.component';

@Component({
  selector: 'app-bolsos',
  templateUrl: './bolsos.component.html',
  styleUrls: ['./bolsos.component.scss']
})
export class BolsosComponent implements OnInit {

  listaBolsos: Bolso[] = [];
  mensajeCompoVacio: boolean | undefined;

  constructor(private homeService: HomeService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.obtenerListaBolsos();
  }

  obtenerListaBolsos() {
    this.homeService.getBolsos().subscribe((data: any) => {
      if (data) {
        this.listaBolsos = data;
      console.log("this.listaBolsos: ", this.listaBolsos)

        // for (let bolso of data) {
        //   this.listaBolsos.push(new Bolso(bolso));
        // }
      }
      else {
        this.mensajeCompoVacio = true;
      }
    }
    )
  }

  eliminarBolso(id: number) {

    
    this.listaBolsos.splice(id, 1);

    // this.homeService.eliminarBolso( id ).subscribe((data: any) => { });

    this.homeService.crearBolso( this.listaBolsos );

    this.dialog.open(ModalConfirmacionComponent, {
      data: { mensaje: 'Bolso eliminado correctamente', esEliminar: true }
    });



  }
}
