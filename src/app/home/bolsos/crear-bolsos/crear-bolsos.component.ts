import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';


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
    public dialog: MatDialog
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

    const imgBolso = this.formCrearBolso.get('nombreBolso')?.value.toLowerCase().replace(/ /g, "-");

    const dataFormulario = {
      nombreBolso: this.formCrearBolso.get('nombreBolso')?.value,
      arquero: this.formCrearBolso.get('arquero')?.value,
      partes: this.formCrearBolso.get('partes')?.value,
      rastreo: this.formCrearBolso.get('rastreo')?.value,
      estado: this.formCrearBolso.get('estado')?.value,
      urlImgBolso: imgBolso
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

  // subirArchivo($event: any) {
  //   console.log("event: ", $event.target)

  //   const file = $event.target.files[0];
  //   console.log("file: ", file)
  //   console.log("file: ", file.name)



  //   const imgRef = ref(this.storage, `bolsos/${file.name}`)
  //     console.log("this.storage: ", this.storage)


  //   uploadBytesResumable(imgRef, file);

  // }

  // obtenerImg(){
  //   const imagesRef = ref(this.storage, '');

  //   listAll(imagesRef)
  //   .then(resp => console.log("resp: ", resp))
  //   .catch(error => console.log("error: ", error))
  // }

}
