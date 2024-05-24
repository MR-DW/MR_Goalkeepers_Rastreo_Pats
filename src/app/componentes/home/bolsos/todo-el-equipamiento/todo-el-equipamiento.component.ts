import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params } from '@angular/router';
import { SnackBarComponent } from 'src/app/componentes/shared/snack-bar/snack-bar.component';
import { Bolso } from 'src/app/modelos/bolso.model';
import { Equipamiento } from 'src/app/modelos/todoElEquipamiento.model';
import { BolsosService } from 'src/app/servicios/bolsos.service';

@Component({
  selector: 'app-todo-el-equipamiento',
  templateUrl: './todo-el-equipamiento.component.html',
  styleUrls: ['./todo-el-equipamiento.component.scss']
})
export class TodoElEquipamientoComponent implements OnInit {

  mensajeCompoVacio: boolean = false;
  clubParam!: string;
  elegirEquipamiento: string[] = [ '--', 'Casco', 'Cuello', 'Pechera', 'Coderas', 'Guantes', 'Inguinal', 'Bermuda', 'Legguards', 'Kickers' ];
  listaBolsos: Bolso[] = [];
  listaEquipamiento: Equipamiento[] = [];
  listaArqueros: string[] = [];
  equipamientoSeleccionado!: string;
 
  constructor(
    private rutaActiva: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private bolsosService:BolsosService,

  ) { }

  ngOnInit(): void {
    this.obtenerClubParam();
    
  }

  obtenerClubParam() {
    this.rutaActiva.params.subscribe({
      next: (
        (miParam: Params) => {
          this.clubParam = miParam['club'];
        }),
      error: (
        (error: any) => {
          this.mensajeCompoVacio = true;
          const mensaje = 'No se pudo obtener la información de su club, intente nuevamente.'
          this.openSnackBar(mensaje);
        }
      )
    })
  }

  obtenerEquipo(parte:any){
    this.equipamientoSeleccionado = parte.toLowerCase();
    this.listaEquipamiento = [];
    this.listaArqueros = [];
    this.obtenerEquipamiento();
  }

  obtenerEquipamiento(){

    this.bolsosService.getBolsos(this.clubParam).subscribe({
      next: (
        (data: any) => {
          this.mensajeCompoVacio = false;
          this.listaBolsos = data ? data : [];

          this.listaBolsos.map( (x:any) => {
            this.listaEquipamiento.push(x[this.equipamientoSeleccionado])
            this.listaArqueros.push(x['arquero'])
          })
        }
      ),
      error: (
        (error: any) => {
          this.mensajeCompoVacio = true;
          const mensaje = 'No se pudieron obtener los bolsos de su club, intente nuevamente.'
          this.openSnackBar(mensaje);
        }
      )
    }
);
  }

  openSnackBar(value: string) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      data: { mensaje: value },
      duration: 5000,
    });
  }

}
