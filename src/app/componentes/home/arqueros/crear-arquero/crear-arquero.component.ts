import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Arqueros } from 'src/app/modelos/arqueros.model';
import { Bolso } from 'src/app/modelos/bolso.model';
import { HomeService } from 'src/app/servicios/home.service';
import { ModalConfirmacionComponent } from 'src/app/componentes/shared/modal-confirmacion/modal-confirmacion.component';
import { ActivatedRoute, Params } from '@angular/router';
import { ArquerosService } from 'src/app/servicios/arqueros.service';
import { SnackBarComponent } from 'src/app/componentes/shared/snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-crear-arquero',
  templateUrl: './crear-arquero.component.html',
  styleUrls: ['./crear-arquero.component.scss']
})
export class CrearArqueroComponent implements OnInit {

  formCrearArquero: FormGroup;
  listaArqueros: Arqueros[] = [];
  clubParam!: string;

  constructor(
    private formBuilder: FormBuilder,
    private homeService: HomeService,
    public dialog: MatDialog,
    private rutaActiva: ActivatedRoute,
    private arquerosService: ArquerosService,
    private _snackBar: MatSnackBar,

  ) {

    this.formCrearArquero = this.formBuilder.group({
      nombreArquero: ['', [Validators.required]],
      division: ['', [Validators.required]],
      equipamientoPropio: ['', [Validators.required]],
      equipamientoClub: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.obtenerClubParam();
    this.obtenerArqueros();
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

  obtenerArqueros() {
    this.arquerosService.getArqueros(this.clubParam).subscribe({
      next: (
        (data: any) => {
          this.listaArqueros = data ? data : [];
        }
      ),
      error: (
        (error: any) => {
          const mensaje = 'No se pudieron obtener los arqueros de su club, intente nuevamente.'
          this.openSnackBar(mensaje);
        }
      )
    }
    );
  }

  crearArquero() {
    const dataFormulario = {
      nombreArquero: this.formCrearArquero.get('nombreArquero')?.value,
      division: this.formCrearArquero.get('division')?.value,
      equipamientoPropio: this.formCrearArquero.get('equipamientoPropio')?.value,
      equipamientoClub: this.formCrearArquero.get('equipamientoClub')?.value
    }

    this.listaArqueros.push(new Arqueros(dataFormulario));

    this.arquerosService.crearArquero(this.clubParam, this.listaArqueros).subscribe({
      next: (
        (data: any) => {
          this.dialog.open(ModalConfirmacionComponent, {
            data: { mensaje: 'Arquero creado correctamente', esCrear: true, clubParam: this.clubParam }
          });
          this.formCrearArquero.reset();
        }
      ),
      error: (
        (error: any) => {
          const mensaje = 'No se pudo crear su arquero, intente nuevamente.'
          this.openSnackBar(mensaje);
        }
      )
    }
    )
  }

  openSnackBar(value: string) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      data: { mensaje: value },
      duration: 5000,
    });
  }
  
}
