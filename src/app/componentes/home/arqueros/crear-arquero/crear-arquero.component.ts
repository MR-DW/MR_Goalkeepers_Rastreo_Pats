import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Arqueros } from 'src/app/modelos/arqueros.model';
import { Bolso } from 'src/app/modelos/bolso.model';
import { HomeService } from 'src/app/servicios/home.service';
import { ModalConfirmacionComponent } from 'src/app/componentes/shared/modal-confirmacion/modal-confirmacion.component';
import { ActivatedRoute, Params } from '@angular/router';
import { ArquerosService } from 'src/app/servicios/arqueros.service';

@Component({
  selector: 'app-crear-arquero',
  templateUrl: './crear-arquero.component.html',
  styleUrls: ['./crear-arquero.component.scss']
})
export class CrearArqueroComponent implements OnInit {

  formCrearArquero: FormGroup;
  listaArqueros: Arqueros[] = [];
  clubParam!:string;

  constructor(
    private formBuilder: FormBuilder, 
    private homeService: HomeService, 
    public dialog: MatDialog,
    private rutaActiva: ActivatedRoute,
    private arquerosService:ArquerosService
  ) {

    this.formCrearArquero = this.formBuilder.group({
      nombreArquero: ['', [Validators.required]],
      division: ['', [Validators.required]],
      equipamientoPropio: ['', [Validators.required]],
      equipamientoClub: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.obtenerClubParam();
    this.obtenerArqueros();
  }

  obtenerClubParam(){
    this.rutaActiva.params.subscribe((miParam: Params) => {
      this.clubParam = miParam['club'];
    })
  }

  obtenerArqueros(){
    this.arquerosService.getArqueros( this.clubParam ).subscribe((data: any) => {
      this.listaArqueros = data ? data : [];
    });
  }

  crearArquero() {
    const dataFormulario = {
      nombreArquero: this.formCrearArquero.get('nombreArquero')?.value,
      division: this.formCrearArquero.get('division')?.value,
      equipamientoPropio: this.formCrearArquero.get('equipamientoPropio')?.value,
      equipamientoClub: this.formCrearArquero.get('equipamientoClub')?.value
    }

    this.listaArqueros.push(new Arqueros(dataFormulario));

    this.arquerosService.crearArquero(this.clubParam, this.listaArqueros).subscribe(
      (data: any) => {
        this.dialog.open(ModalConfirmacionComponent, {
          data: { mensaje: 'Bolso creado correctamente', esCrear: true, clubParam: this.clubParam }
      });
        this.formCrearArquero.reset();
      })
  }
}
