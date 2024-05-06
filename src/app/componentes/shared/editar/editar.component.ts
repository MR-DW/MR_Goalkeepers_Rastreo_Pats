import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalConfirmacionComponent } from '../modal-confirmacion/modal-confirmacion.component';
import { Bolso } from 'src/app/modelos/bolso.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeService } from 'src/app/servicios/home.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { getDownloadURL, listAll, ref, uploadBytes, Storage, deleteObject } from '@angular/fire/storage';
import { Arqueros } from 'src/app/modelos/arqueros.model';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {

  idParam: any;

  formEditarBolso!: FormGroup;
  bolso!: Bolso;
  file!: any;
  uploadRef!: any;
  pathImg: any = undefined;
  hayNuevaImg: boolean = false;
  @ViewChild('inputeditarimagen') inputeditarimagen!: ElementRef<HTMLInputElement>;
  seEditaBolso!:boolean;

  arquero!: Arqueros;
  formEditarArquero!: FormGroup;
  seEditaArquero!:boolean;
  clubParam!:string;

  constructor(
    private formBuilder: FormBuilder,
    private homeService: HomeService,
    public dialog: MatDialog,
    private rutaActiva: ActivatedRoute,
    private storage: Storage,
    private router: Router
  ) {
    this.formEditarBolso = this.formBuilder.group({
      nombreBolso: ['', [Validators.required]],
      arquero: ['', [Validators.required]],
      partes: ['', [Validators.required]],
      rastreo: ['', [Validators.required]],
      estado: ['', [Validators.required]],
    });
    this.formEditarArquero = this.formBuilder.group({
      nombreArquero: ['', [Validators.required]],
      division: ['', [Validators.required]],
      equipamientoPropio: ['', [Validators.required]],
      equipamientoClub: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {

    this.rutaActiva.params.subscribe((miParam: Params) => {
      this.idParam = miParam['id'];
    })

    this.rutaActiva.params.subscribe((miParam: Params) => {
      this.clubParam = miParam['club'];
    })

    this.obtenerDetallesBolso();
    this.obtenerDetallesArquero();

  }

  obtenerDetallesBolso() {
    this.homeService.getDetalleBolso(this.clubParam, this.idParam).subscribe((data: any) => {

      this.seEditaBolso = true;
      this.seEditaArquero = false;

      this.bolso = new Bolso(data);

      this.formEditarBolso = this.formBuilder.group({
        nombreBolso: [this.bolso.nombreBolso, [Validators.required]],
        arquero: [this.bolso.arquero, [Validators.required]],
        partes: [this.bolso.partes, [Validators.required]],
        rastreo: [this.bolso.rastreo, [Validators.required]],
        estado: [this.bolso.estado, [Validators.required]],
      })

      this.pathImg = this.bolso.urlImgBolso;

    });
  }

  subirArchivo($event: any) {
    this.file = $event.target.files[0];
    console.log(
      " this.file: ", this.file
    )
    this.uploadRef = ref(this.storage, `bolsos/${this.file.name}`);
    console.log()
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

    this.homeService.editarBolso(this.clubParam,this.idParam, dataFormulario).subscribe(
      (data: any) => {
        this.dialog.open(ModalConfirmacionComponent, {
          data: { mensaje: 'Bolso editado', esCrear: false }
        });
        if (this.inputeditarimagen.nativeElement.value != '') {
          this.borrarImagenVieja();
        }
        this.router.navigate(['/bolsos']);
      })
  }

  obtenerDetallesArquero() {
    this.homeService.getDetalleArquero( this.clubParam ,this.idParam).subscribe((data: any) => {
      this.seEditaBolso = false;
      this.seEditaArquero = true;
      this.arquero = new Arqueros(data);

      this.formEditarArquero = this.formBuilder.group({
        nombreArquero: [this.arquero.nombreArquero, [Validators.required]],
        division: [this.arquero.division, [Validators.required]],
        equipamientoPropio: [this.arquero.equipamientoPropio, [Validators.required]],
        equipamientoClub: [this.arquero.equipamientoClub, [Validators.required]],
      })

    })
  }

  editarArquero(){
    const dataFormulario = {
      nombreArquero: this.formEditarArquero.get('nombreArquero')?.value,
      division: this.formEditarArquero.get('division')?.value,
      equipamientoPropio: this.formEditarArquero.get('equipamientoPropio')?.value,
      equipamientoClub: this.formEditarArquero.get('equipamientoClub')?.value,
    }

    this.homeService.editarArquero(this.clubParam ,this.idParam, dataFormulario).subscribe(
      (data: any) => {
        this.dialog.open(ModalConfirmacionComponent, {
          data: { mensaje: 'Arquero editado', esCrear: false }
        });
        this.router.navigate(['/arqueros']);
      })
  }
}
