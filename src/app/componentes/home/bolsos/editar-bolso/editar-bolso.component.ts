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
      ubicacion: ['', [Validators.required]],
      observaciones: ['', [Validators.required]],
      // Partes
      casco: ['', [Validators.required]],
      cuello: ['', [Validators.required]],
      pechera: ['', [Validators.required]],
      coderas: ['', [Validators.required]],
      guantes: ['', [Validators.required]],
      inguinal: ['', [Validators.required]],
      bermuda: ['', [Validators.required]],
      legguards: ['', [Validators.required]],
      kickers: ['', [Validators.required]],
      bolso: ['', [Validators.required]]

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
      arquero: this.formEditarBolso.get('arquero')?.value,
      observaciones: this.formEditarBolso.get('observaciones')?.value,
      nombreBolso: this.formEditarBolso.get('nombreBolso')?.value,
      ubicacion: this.formEditarBolso.get('ubicacion')?.value,
      // Partes
      casco: this.formEditarBolso.get('casco')?.value,
      cuello: this.formEditarBolso.get('cuello')?.value,
      pechera: this.formEditarBolso.get('pechera')?.value,
      coderas: this.formEditarBolso.get('coderas')?.value,
      guantes: this.formEditarBolso.get('guantes')?.value,
      inguinal: this.formEditarBolso.get('inguinal')?.value,
      bermuda: this.formEditarBolso.get('bermuda')?.value,
      legguards: this.formEditarBolso.get('legguards')?.value,
      kickers: this.formEditarBolso.get('kickers')?.value,
      bolso: this.formEditarBolso.get('bolso')?.value,

      urlImgBolso: this.pathImg
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
