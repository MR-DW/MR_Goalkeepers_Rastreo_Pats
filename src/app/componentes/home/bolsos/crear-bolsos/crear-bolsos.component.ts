import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Storage, deleteObject, getDownloadURL, listAll, ref, uploadBytes } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params } from '@angular/router';
import { ModalConfirmacionComponent } from 'src/app/componentes/shared/modal-confirmacion/modal-confirmacion.component';
import { SnackBarComponent } from 'src/app/componentes/shared/snack-bar/snack-bar.component';
import { Bolso } from 'src/app/modelos/bolso.model';
import { BolsosService } from 'src/app/servicios/bolsos.service';

@Component({
  selector: 'app-crear-bolsos',
  templateUrl: './crear-bolsos.component.html',
  styleUrls: ['./crear-bolsos.component.scss']
})
export class CrearBolsosComponent implements OnInit {

  formCrearBolso: FormGroup;
  listaBolsos: Bolso[] = [];
  file!: any;
  uploadRef!: any;
  downloadRef!: any;
  pathImg!: any;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  clubParam!:string;

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private storage: Storage,
    private rutaActiva: ActivatedRoute,
    private bolsosService:BolsosService,
    private _snackBar: MatSnackBar,

  ) {
    // Habilitar la recopilación automática de datos
    this.storage.app.automaticDataCollectionEnabled = true;

    this.formCrearBolso = this.formBuilder.group({
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
    this.obtenerBolsos();
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

  obtenerBolsos(){
    this.bolsosService.getBolsos(this.clubParam).subscribe({
      next: (
        (data: any) => {
          this.listaBolsos = data ? data : [];
        }
      ),
      error: (
        (error: any) => {
          const mensaje = 'No se pudieron obtener los bolsos de su club, intente nuevamente.'
          this.openSnackBar(mensaje);
        }
      )
    });
  }

  subirArchivo($event: any) {
    this.file = $event.target.files[0];

    this.uploadRef = ref(this.storage, `bolsos/${this.file.name}`);

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

  crearBolso() {

    const dataFormulario = {
      arquero: this.formCrearBolso.get('arquero')?.value,
      observaciones: this.formCrearBolso.get('observaciones')?.value,
      nombreBolso: this.formCrearBolso.get('nombreBolso')?.value,
      ubicacion: this.formCrearBolso.get('ubicacion')?.value,
      // Partes
      casco: this.formCrearBolso.get('casco')?.value,
      // urlImgCasco: this.pathImg,

      cuello: this.formCrearBolso.get('cuello')?.value,
      // urlImgCuello: this.pathImg,

      pechera: this.formCrearBolso.get('pechera')?.value,
      // urlImgPechera: this.pathImg,

      coderas: this.formCrearBolso.get('coderas')?.value,
      // urlImgCoderas: this.pathImg,

      guantes: this.formCrearBolso.get('guantes')?.value,
      // urlImgGuantes: this.pathImg,

      inguinal: this.formCrearBolso.get('inguinal')?.value,
      // urlImgInguinal: this.pathImg,

      bermuda: this.formCrearBolso.get('bermuda')?.value,
      // urlImgBermuda: this.pathImg,

      legguards: this.formCrearBolso.get('legguards')?.value,
      // urlImgLegguards: this.pathImg,

      kickers: this.formCrearBolso.get('kickers')?.value,
      // urlImgKickers: this.pathImg,

      bolso: this.formCrearBolso.get('bolso')?.value,
      // urlImgBolso: this.pathImg,

      urlImgEquipamiento: this.pathImg,
    }

    this.listaBolsos.push(new Bolso(dataFormulario))

    this.bolsosService.crearBolso(this.clubParam, this.listaBolsos).subscribe(
      {
      next:(
        (data: any) => {

          this.dialog.open(ModalConfirmacionComponent, {
            data: { mensaje: 'Bolso creado correctamente', esCrear: true, clubParam: this.clubParam, esEquipamiento: true }
          });
  
          this.formCrearBolso.reset();
          this.file = undefined;
          this.pathImg = undefined;
          this.fileInput.nativeElement.value = '';
  
        }
      ),
      error:(
        (error:any) => {
          const mensaje = 'No se pudo crear su bolso, intente nuevamente.'
          this.openSnackBar(mensaje);
        }
      )
    })
  }

  cancelar() {
    if (this.pathImg != undefined) {

      deleteObject(this.uploadRef)
        .then(resp => { })
        .catch(error => { })
    }
  }

  openSnackBar(value: string) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      data: { mensaje: value },
      duration: 5000,
    });
  }

}
