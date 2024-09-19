import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ModalConfirmacionComponent } from 'src/app/componentes/shared/modal-confirmacion/modal-confirmacion.component';
import { SnackBarComponent } from 'src/app/componentes/shared/snack-bar/snack-bar.component';
import { Arqueros } from 'src/app/modelos/arqueros.model';
import { ArquerosService } from 'src/app/servicios/arqueros.service';

@Component({
  selector: 'app-editar-arqueros',
  templateUrl: './editar-arqueros.component.html',
  styleUrls: ['./editar-arqueros.component.scss']
})
export class EditarArquerosComponent implements OnInit {

  idParam: any;
  arquero!: Arqueros;
  formEditarArquero!: FormGroup;
  seEditaArquero!: boolean;
  clubParam!: string;

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private rutaActiva: ActivatedRoute,
    private router: Router,
    private arquerosService: ArquerosService,
    private _snackBar: MatSnackBar,
  ) {

    this.formEditarArquero = this.formBuilder.group({
      nombreArquero: ['', [Validators.required]],
      division: ['', [Validators.required]],
      equipamientoPropio: ['', [Validators.required]],
      equipamientoClub: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.obtenerClubParam();
    this.obtenerIdParam();

    this.obtenerDetallesArquero();
  }

  obtenerClubParam() {
    this.rutaActiva.params.subscribe({
      next: (
        (miParam: Params) => {
          this.clubParam = miParam['club'];
        }),
      error: (
        (error: any) => {
          const mensaje = 'No se pudo obtener la información de su bolso, intente nuevamente.'
          this.openSnackBar(mensaje);
        }
      )
    })
  }

  obtenerIdParam() {
    this.rutaActiva.params.subscribe({
      next: (
        (miParam: Params) => {
          this.idParam = miParam['id'];
        }),
      error: (
        (error: any) => {
          const mensaje = 'No se pudo obtener la información de su bolso, intente nuevamente.'
          this.openSnackBar(mensaje);
        }
      )
    })
  }

  obtenerDetallesArquero() {
    this.arquerosService.getDetalleArquero(this.clubParam, this.idParam).subscribe({
      next: (
        (data: any) => {

          this.arquero = new Arqueros(data);

          this.formEditarArquero = this.formBuilder.group({
            nombreArquero: [this.arquero.nombreArquero, [Validators.required]],
            division: [this.arquero.division, [Validators.required]],
            equipamientoPropio: [this.arquero.equipamientoPropio, [Validators.required]],
            equipamientoClub: [this.arquero.equipamientoClub, [Validators.required]],
          })

        }
      ),
      error: (
        (error: any) => {
          const mensaje = 'No se pudo obtener la información de su arquero, intente nuevamente.'
          this.openSnackBar(mensaje);
        }
      )
    })
  }

  editarArquero() {
    const dataFormulario = {
      nombreArquero: this.formEditarArquero.get('nombreArquero')?.value,
      division: this.formEditarArquero.get('division')?.value,
      equipamientoPropio: this.formEditarArquero.get('equipamientoPropio')?.value,
      equipamientoClub: this.formEditarArquero.get('equipamientoClub')?.value,
    }

    this.arquerosService.editarArquero(this.clubParam, this.idParam, dataFormulario).subscribe({
      next: (
        (data: any) => {
          this.dialog.open(ModalConfirmacionComponent, {
            data: { mensaje: 'Arquero editado', esCrear: false }
          });
          this.router.navigate([this.clubParam, 'arqueros']);
        }
      ),
      error: (
        (error: any) => {
          const mensaje = 'No se pudo editar la información de su arquero, intente nuevamente.'
          this.openSnackBar(mensaje);
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
