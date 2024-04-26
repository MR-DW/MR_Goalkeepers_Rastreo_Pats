import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalConfirmacionComponent } from '../modal-confirmacion/modal-confirmacion.component';
import { Bolso } from 'src/app/modelos/bolso.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeService } from 'src/app/servicios/home.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { getDownloadURL, listAll, ref, uploadBytes, Storage } from '@angular/fire/storage';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {

  formEditarBolso!: FormGroup;
  bolso!: Bolso;
  file!: any;
  uploadRef!: any;
  pathImg: any = undefined;
  idParam: any;
  hayNuevaImg: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private homeService: HomeService,
    public dialog: MatDialog,
    private rutaActiva: ActivatedRoute,
    private storage: Storage
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

    this.rutaActiva.params.subscribe((miParam: Params) => {
      this.idParam = miParam['id'];
    })

    this.homeService.getDetalleBolso(this.idParam).subscribe((data: any) => {

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
    this.uploadRef = ref(this.storage, `bolsos/ ${this.file.name}`);
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

  editarBolso() {

    const dataFormulario = {
      nombreBolso: this.formEditarBolso.get('nombreBolso')?.value,
      arquero: this.formEditarBolso.get('arquero')?.value,
      partes: this.formEditarBolso.get('partes')?.value,
      rastreo: this.formEditarBolso.get('rastreo')?.value,
      estado: this.formEditarBolso.get('estado')?.value,
      urlImgBolso: this.pathImg,
    }

    this.homeService.editarBolso(this.idParam, dataFormulario).subscribe(
      (data: any) => {
        this.dialog.open(ModalConfirmacionComponent, {
          data: { mensaje: 'Bolso editado', esCrear: false }
        });
      })
  }
}
