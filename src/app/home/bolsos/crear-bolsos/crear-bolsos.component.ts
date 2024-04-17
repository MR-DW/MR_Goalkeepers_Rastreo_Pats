import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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


  constructor(private formBuilder: FormBuilder, private homeService: HomeService, public dialog: MatDialog) {

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

}
