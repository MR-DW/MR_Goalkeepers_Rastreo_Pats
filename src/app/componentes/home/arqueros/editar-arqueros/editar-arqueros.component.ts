import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ModalConfirmacionComponent } from 'src/app/componentes/shared/modal-confirmacion/modal-confirmacion.component';
import { Arqueros } from 'src/app/modelos/arqueros.model';
import { ArquerosService } from 'src/app/servicios/arqueros.service';
import { HomeService } from 'src/app/servicios/home.service';

@Component({
  selector: 'app-editar-arqueros',
  templateUrl: './editar-arqueros.component.html',
  styleUrls: ['./editar-arqueros.component.scss']
})
export class EditarArquerosComponent implements OnInit {
  
  idParam: any;
  arquero!: Arqueros;
  formEditarArquero!: FormGroup;
  seEditaArquero!:boolean;
  clubParam!: string;

  constructor(
    private formBuilder: FormBuilder,
    private homeService: HomeService,
    public dialog: MatDialog,
    private rutaActiva: ActivatedRoute,
    private router: Router,
    private arquerosService:ArquerosService
  ) {

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

    this.obtenerDetallesArquero();
  }

  obtenerDetallesArquero() {
    this.arquerosService.getDetalleArquero(this.clubParam, this.idParam).subscribe((data: any) => {

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

    this.arquerosService.editarArquero(this.clubParam, this.idParam, dataFormulario).subscribe(
      (data: any) => {
        this.dialog.open(ModalConfirmacionComponent, {
          data: { mensaje: 'Arquero editado', esCrear: false }
        });
        this.router.navigate([this.clubParam, 'arqueros']);
      })
  }

}
