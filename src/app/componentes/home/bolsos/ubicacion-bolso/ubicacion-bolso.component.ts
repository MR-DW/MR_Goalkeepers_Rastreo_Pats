import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ModalConfirmacionComponent } from 'src/app/componentes/shared/modal-confirmacion/modal-confirmacion.component';
import { SnackBarComponent } from 'src/app/componentes/shared/snack-bar/snack-bar.component';
import { Bolso } from 'src/app/modelos/bolso.model';
import { BolsosService } from 'src/app/servicios/bolsos.service';

@Component({
  selector: 'app-ubicacion-bolso',
  templateUrl: './ubicacion-bolso.component.html',
  styleUrls: ['./ubicacion-bolso.component.scss']
})
export class UbicacionBolsoComponent implements OnInit {

  formUbicacion!: FormGroup;
  clubParam!: string;
  idParam!: any;
  bolso!: Bolso;

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private rutaActiva: ActivatedRoute,
    private router: Router,
    private bolsosService: BolsosService,
    private _snackBar: MatSnackBar,
  ) {
    this.formUbicacion = this.formBuilder.group({
      ubicacion: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.obtenerClubParam();
    this.obtenerIdParam();
    this.obtenerDetallesBolso();
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

  obtenerDetallesBolso() {
    this.bolsosService.getDetalleBolso(this.clubParam, this.idParam).subscribe({
      next: (
        (data: any) => {

          this.bolso = new Bolso(data);

          this.formUbicacion = this.formBuilder.group({
            nombreBolso: [this.bolso.nombreBolso, [Validators.required]],
            arquero: [this.bolso.arquero, [Validators.required]],
            ubicacion: [this.bolso.arquero, [Validators.required]],
            observaciones: [this.bolso.arquero, [Validators.required]],
            // Partes
            casco: [this.bolso.casco, [Validators.required]],
            cuello: [this.bolso.cuello, [Validators.required]],
            pechera: [this.bolso.pechera, [Validators.required]],
            coderas: [this.bolso.coderas, [Validators.required]],
            guantes: [this.bolso.guantes, [Validators.required]],
            inguinal: [this.bolso.inguinal, [Validators.required]],
            bermuda: [this.bolso.bermuda, [Validators.required]],
            legguards: [this.bolso.legguards, [Validators.required]],
            kickers: [this.bolso.kickers, [Validators.required]],
            bolso: [this.bolso.bolso, [Validators.required]]
          })
        }
      ),
      error: (
        (error: any) => {
          const mensaje = 'No se pudo obtener la información de su bolso, intente nuevamente.'
          this.openSnackBar(mensaje);
        }
      )
    })
  }

  editarUbicacion() {

    const dataFormulario = {
      ubicacion: this.formUbicacion.get('ubicacion')?.value,
      date: this.formUbicacion.get('date')?.value,
      arquero: this.bolso.arquero,
      observaciones: this.bolso.observaciones,
      nombreBolso: this.bolso.nombreBolso,
      // Partes
      casco: this.bolso.casco,
      cuello: this.bolso.cuello,
      pechera: this.bolso.pechera,
      coderas: this.bolso.coderas,
      guantes: this.bolso.guantes,
      inguinal: this.bolso.inguinal,
      bermuda: this.bolso.bermuda,
      legguards: this.bolso.legguards,
      kickers: this.bolso.kickers,
      bolso: this.bolso.bolso,

      urlImgBolso: this.bolso.urlImgBolso
    }

    this.bolsosService.editarBolso(this.clubParam, this.idParam, dataFormulario).subscribe({
      next: (
        (data: any) => {
          this.dialog.open(ModalConfirmacionComponent, {
            data: { mensaje: 'Bolso editado', esCrear: false }
          });
          this.router.navigate(['/bolsos']);
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
