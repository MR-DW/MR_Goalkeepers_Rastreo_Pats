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
      partes: ['', [Validators.required]],
      rastreo: ['', [Validators.required]],
      estado: ['', [Validators.required]]
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
    }
);
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
      estado: this.formCrearBolso.get('estado')?.value,
      nombreBolso: this.formCrearBolso.get('nombreBolso')?.value,
      partes: this.formCrearBolso.get('partes')?.value,
      rastreo: this.formCrearBolso.get('rastreo')?.value,
      urlImgBolso: this.pathImg,
    }

    this.listaBolsos.push(new Bolso(dataFormulario))

    this.bolsosService.crearBolso(this.clubParam, this.listaBolsos).subscribe({
      next:(
        (data: any) => {

          this.dialog.open(ModalConfirmacionComponent, {
            data: { mensaje: 'Bolso creado correctamente', esCrear: true }
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
    }
)
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
