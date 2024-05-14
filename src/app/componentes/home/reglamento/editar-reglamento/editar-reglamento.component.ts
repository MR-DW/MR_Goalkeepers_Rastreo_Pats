import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ModalConfirmacionComponent } from 'src/app/componentes/shared/modal-confirmacion/modal-confirmacion.component';
import { ReglamentoService } from 'src/app/servicios/reglamento.service';

@Component({
  selector: 'app-editar-reglamento',
  templateUrl: './editar-reglamento.component.html',
  styleUrls: ['./editar-reglamento.component.scss']
})
export class EditarReglamentoComponent implements OnInit {

  formEditarReglamento!: FormGroup;
  miReglamento!:any;
  clubParam!:string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private rutaActiva: ActivatedRoute,
    private reglamentoService: ReglamentoService
  ) {
    this.formEditarReglamento = this.formBuilder.group({
      reglamento: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.obtenerClubParam();
    this.obtenerReglamento();
  }

  obtenerClubParam(){
    this.rutaActiva.params.subscribe((miParam: Params) => {
      this.clubParam = miParam['club'];
    })
  }

  obtenerReglamento(){
    this.reglamentoService.getReglamento( this.clubParam ).subscribe((data: any) => {

      this.miReglamento = data;

      this.formEditarReglamento = this.formBuilder.group({
        reglamento: [ this.miReglamento?.reglamento, [Validators.required]]
      })
    })
  }

  editarReglamento() {

    const dataFormulario = {
      reglamento: this.formEditarReglamento.get('reglamento')?.value,
    }

    this.reglamentoService.editarReglamento(this.clubParam, dataFormulario).subscribe(
      (data: any) => {
        this.dialog.open(ModalConfirmacionComponent, {
          data: { mensaje: 'Reglamento editado', esCrear: false }
        });

        this.router.navigate([`${this.clubParam}/reglamento`]);
      },
    (error: any) => {
      this.dialog.open(ModalConfirmacionComponent, {
        data: { mensaje: 'El reglamento no pudo ser editado intente más tarde', esCrear: false }
      });
    })
  }
}


