import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { Storage, ref, uploadBytes } from '@angular/fire/storage';

import { Bolso } from 'src/app/modelos/bolso.model';
import { HomeService } from 'src/app/servicios/home.service';
import { ModalConfirmacionComponent } from 'src/app/shared/modal-confirmacion/modal-confirmacion.component';

@Component({
  selector: 'app-crear-bolsos',
  templateUrl: './crear-bolsos.component.html',
  styleUrls: ['./crear-bolsos.component.scss']
})
export class CrearBolsosComponent implements OnInit {

  formCrearBolso: FormGroup;
  listaBolsos: Bolso[] = [];

  @ViewChild('form') formElement!: ElementRef;


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

  crearBolso() {

    const dataFormulario = {
      nombreBolso: this.formCrearBolso.get('nombreBolso')?.value,
      arquero: this.formCrearBolso.get('arquero')?.value,
      partes: this.formCrearBolso.get('partes')?.value,
      rastreo: this.formCrearBolso.get('rastreo')?.value,
      estado: this.formCrearBolso.get('estado')?.value
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

  subirArchivo($event: any) {
    console.log("event: ", $event.target)

    const file = $event.target.files[0];
    console.log("file: ", file)


    const imgRef = ref(this.storage, `bolsos/${file.name}`)
      console.log("imgRef: ", imgRef)


    uploadBytes(imgRef, file)
      .then(resp => {
        console.log("x: ", resp)
      })
      .catch(error => console.log(error))

  }

}
