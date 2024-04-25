import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Storage, deleteObject, getDownloadURL, listAll, ref, uploadBytes } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmacionComponent } from 'src/app/componentes/shared/modal-confirmacion/modal-confirmacion.component';
import { Bolso } from 'src/app/modelos/bolso.model';
import { HomeService } from 'src/app/servicios/home.service';

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
  pathImg!: string;
  @ViewChild('form') formElement!: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private homeService: HomeService,
    public dialog: MatDialog,
    private storage: Storage
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

    this.homeService.getBolsos().subscribe((data: any) => {
      this.listaBolsos = data ? data : [];
    });
  }

  subirArchivo($event: any) {
    this.file = $event.target.files[0];
    this.uploadRef = ref(this.storage, `bolsos/ ${this.file.name}`);

    uploadBytes(this.uploadRef, this.file)
      .then(() => {
        this.obtenerImagen();
      })
      .catch()

  }

  obtenerImagen() {
    this.downloadRef = ref(this.storage, 'bolsos');

    listAll(this.downloadRef)
      .then(async resp => {

        resp.items.map(async (item) => {

          if (resp.items[resp.items.indexOf(item)].name == resp.items[resp.items.length - 1].name)

            this.pathImg = await getDownloadURL(resp.items[resp.items.indexOf(item)]);
        })
      })
      .catch(error => {})
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

    this.homeService.crearBolso(this.listaBolsos).subscribe(
      (data: any) => {

        this.dialog.open(ModalConfirmacionComponent, {
          data: { mensaje: 'Bolso creado correctamente', esCrear: true }
        });

        this.formCrearBolso.reset();
      })
  }

  cancelar() {
    if (this.pathImg != undefined) {

      deleteObject(this.uploadRef)
        .then(resp =>{})
        .catch(error => {})
    }
  }

}
