import { Component, OnInit } from '@angular/core';
import { Storage, deleteObject, listAll, ref } from '@angular/fire/storage';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
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
  bolsoEliminado!: any;
  clubParam!:string;

  constructor(
    private homeService: HomeService,
    public dialog: MatDialog,
    private storage: Storage,
    private rutaActiva: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.obtenerClubParam();
    this.obtenerListaBolsos();
  }

  obtenerClubParam(){
    this.rutaActiva.params.subscribe((miParam: Params) => {
      this.clubParam = miParam['club'];
    })
  }

  obtenerListaBolsos() {
    this.homeService.getBolsos(this.clubParam).subscribe((data: any) => {
      if (data) {
        this.listaBolsos = data;
      }
      else {
        this.mensajeCompoVacio = true;
      }
    }
    )
  }

  eliminarBolso(id: number) {

    this.bolsoEliminado = this.listaBolsos.splice(id, 1);

    this.eliminarImagenBolso();

    this.homeService.crearBolso(this.clubParam, this.listaBolsos).subscribe();

    this.dialog.open(ModalConfirmacionComponent, {
      data: { mensaje: 'Bolso eliminado correctamente', esEliminar: true }
    });

  }

  eliminarImagenBolso() {

    this.bolsoEliminado.map((prop: any) => {
      let pedasos = prop.urlImgBolso.split('?');
      let pathParte = pedasos[0].split('%2F');
      let pathImg = pathParte ? pathParte[1] : null;

      const deleteRef = ref(this.storage, `bolsos/${pathImg}`);

      deleteObject(deleteRef)
      .then(resp => { })
      .catch(error => { })

    })

  }

}
