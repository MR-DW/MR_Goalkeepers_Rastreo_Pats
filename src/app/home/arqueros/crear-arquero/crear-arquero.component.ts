import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Arqueros } from 'src/app/modelos/arqueros.model';
import { Bolso } from 'src/app/modelos/bolso.model';
import { HomeService } from 'src/app/servicios/home.service';
import { ModalConfirmacionComponent } from 'src/app/shared/modal-confirmacion/modal-confirmacion.component';

@Component({
  selector: 'app-crear-arquero',
  templateUrl: './crear-arquero.component.html',
  styleUrls: ['./crear-arquero.component.scss']
})
export class CrearArqueroComponent implements OnInit {

  formCrearArquero: FormGroup;
  listaArqueros: Arqueros[] = [];

  constructor(private formBuilder: FormBuilder, private homeService: HomeService, public dialog: MatDialog) {

    this.formCrearArquero = this.formBuilder.group({
      nombreBolso: ['', [Validators.required]],
      arquero: ['', [Validators.required]],
      partes: ['', [Validators.required]],
      rastreo: ['', [Validators.required]],
      estado: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.homeService.getArqueros().subscribe((data: any) => {
      this.listaArqueros = data;
    });
  }

  crearArquero() {

    const dataFormulario = {
      nombreArquero: this.formCrearArquero.get('nombreArquero')?.value,
      division: this.formCrearArquero.get('division')?.value,
      equipamientoPropio: this.formCrearArquero.get('equipamientoPropio')?.value,
      equipamientoClub: this.formCrearArquero.get('equipamientoClub')?.value,
      estadoEquipo: this.formCrearArquero.get('estadoEquipo')?.value,
      rastreoEquipo: this.formCrearArquero.get('rastreoEquipo')?.value,

    }

    this.listaArqueros.push(new Arqueros(dataFormulario))

    this.homeService.crearArquero(this.listaArqueros).subscribe(
      (data: any) => {
        this.dialog.open(ModalConfirmacionComponent, {
          data: { mensaje: 'Bolso creado correctamente', esCrear: true }
      });
        this.formCrearArquero.reset();
      })
  }
}
