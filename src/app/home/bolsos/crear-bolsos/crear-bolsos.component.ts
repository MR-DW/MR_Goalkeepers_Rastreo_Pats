import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Storage, ref, uploadBytes } from '@angular/fire/storage';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { Bolso } from 'src/app/modelos/bolso.model';
import { HomeService } from 'src/app/servicios/home.service';
import { ModalConfirmacionComponent } from 'src/app/shared/modal-confirmacion/modal-confirmacion.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-crear-bolsos',
  templateUrl: './crear-bolsos.component.html',
  styleUrls: ['./crear-bolsos.component.scss']
})
export class CrearBolsosComponent implements OnInit {

  formCrearBolso: FormGroup;
  listaBolsos: Bolso[] = [];
  file!: any;
  imgRef!: any;

  @ViewChild('form') formElement!: ElementRef;

  imgPath!: any;

  constructor(
    private formBuilder: FormBuilder,
    private homeService: HomeService,
    public dialog: MatDialog,
    private storage: Storage
  ) {

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
    this.imgRef = ref(this.storage, `bolsos/${this.file.name}`)

  }

  crearBolso() {

    const dataFormulario = {
      arquero: this.formCrearBolso.get('arquero')?.value,
      estado: this.formCrearBolso.get('estado')?.value,
      nombreBolso: this.formCrearBolso.get('nombreBolso')?.value,
      partes: this.formCrearBolso.get('partes')?.value,
      rastreo: this.formCrearBolso.get('rastreo')?.value,
      urlImgBolso: environment.urlImgBolso + this.file.name + environment.urlImgBolsosFinal,
    }

    this.listaBolsos.push(new Bolso(dataFormulario))

    this.homeService.crearBolso(this.listaBolsos).subscribe(
      (data: any) => {

        uploadBytes(this.imgRef, this.file)
          .then((resp) => { console.log("resp: ", resp) })
          .catch(error => console.log("error: ", error));

        this.dialog.open(ModalConfirmacionComponent, {
          data: { mensaje: 'Bolso creado correctamente', esCrear: true }
        });

        this.formCrearBolso.reset();
        this.file = '';
        this.imgRef = '';
      })
  }

}
