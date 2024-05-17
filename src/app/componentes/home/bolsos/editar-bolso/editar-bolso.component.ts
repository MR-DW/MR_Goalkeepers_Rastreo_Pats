import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Storage, deleteObject, getDownloadURL, listAll, ref, uploadBytes } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ModalConfirmacionComponent } from 'src/app/componentes/shared/modal-confirmacion/modal-confirmacion.component';
import { SnackBarComponent } from 'src/app/componentes/shared/snack-bar/snack-bar.component';
import { Bolso } from 'src/app/modelos/bolso.model';
import { BolsosService } from 'src/app/servicios/bolsos.service';

@Component({
  selector: 'app-editar-bolso',
  templateUrl: './editar-bolso.component.html',
  styleUrls: ['./editar-bolso.component.scss']
})
export class EditarBolsoComponent implements OnInit {
  idParam: any;

  formEditarBolso!: FormGroup;
  bolso!: Bolso;
  file!: any;
  uploadRef!: any;
  pathImg: any = undefined;
  hayNuevaImg: boolean = false;
  @ViewChild('inputeditarimagen') inputeditarimagen!: ElementRef<HTMLInputElement>;
  seEditaBolso!: boolean;
  clubParam!: string;

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private rutaActiva: ActivatedRoute,
    private storage: Storage,
    private router: Router,
    private bolsosService: BolsosService,
    private _snackBar: MatSnackBar,
  ) {
    this.formEditarBolso = this.formBuilder.group({
      nombreBolso: ['', [Validators.required]],
      arquero: ['', [Validators.required]],
      partes: ['', [Validators.required]],
      rastreo: ['', [Validators.required]],
      estado: ['', [Validators.required]],
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

          this.formEditarBolso = this.formBuilder.group({
            nombreBolso: [this.bolso.nombreBolso, [Validators.required]],
            arquero: [this.bolso.arquero, [Validators.required]],
            partes: [this.bolso.partes, [Validators.required]],
            rastreo: [this.bolso.rastreo, [Validators.required]],
            estado: [this.bolso.estado, [Validators.required]],
          })

          this.pathImg = this.bolso.urlImgBolso;

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

  subirArchivo($event: any) {
    this.file = $event.target.files[0];
    this.uploadRef = ref(this.storage, `bolsos/${this.file.name}`);
    this.pathImg = undefined;

    uploadBytes(this.uploadRef, this.file)
      .then(() => {
        this.obtenerImagen();
      })
      .catch()
  }

  obtenerImagen() {
    listAll(this.uploadRef)
      .then(async resp => {
        this.pathImg = await getDownloadURL(this.uploadRef);
      })
      .catch(error => { })
  }

  borrarImagenVieja() {

    let pedasos = this.bolso.urlImgBolso.split('?');
    let pathParte = pedasos[0].split('%2F');
    let pathImgVieja = pathParte ? pathParte[1] : null;

    const deleteRef = ref(this.storage, `bolsos/${pathImgVieja}`);

    deleteObject(deleteRef)
      .then(resp => { })
      .catch(error => { })
  }

  cancelarCambioImg() {
    deleteObject(this.uploadRef)
      .then(resp => { })
      .catch(error => { })
  }

  editarBolso() {

    const dataFormulario = {
      nombreBolso: this.formEditarBolso.get('nombreBolso')?.value,
      arquero: this.formEditarBolso.get('arquero')?.value,
      partes: this.formEditarBolso.get('partes')?.value,
      rastreo: this.formEditarBolso.get('rastreo')?.value,
      estado: this.formEditarBolso.get('estado')?.value,
      urlImgBolso: this.pathImg,
    }

    this.bolsosService.editarBolso(this.clubParam, this.idParam, dataFormulario).subscribe({
      next: (
        (data: any) => {
          this.dialog.open(ModalConfirmacionComponent, {
            data: { mensaje: 'Bolso editado', esCrear: false }
          });
          if (this.inputeditarimagen.nativeElement.value != '') {
            this.borrarImagenVieja();
          }
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
