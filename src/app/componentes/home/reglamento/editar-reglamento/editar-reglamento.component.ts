import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ModalConfirmacionComponent } from 'src/app/componentes/shared/modal-confirmacion/modal-confirmacion.component';
import { SnackBarComponent } from 'src/app/componentes/shared/snack-bar/snack-bar.component';
import { ReglamentoService } from 'src/app/servicios/reglamento.service';

@Component({
  selector: 'app-editar-reglamento',
  templateUrl: './editar-reglamento.component.html',
  styleUrls: ['./editar-reglamento.component.scss']
})
export class EditarReglamentoComponent implements OnInit {

  formEditarReglamento!: FormGroup;
  miReglamento!: any;
  clubParam!: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private rutaActiva: ActivatedRoute,
    private reglamentoService: ReglamentoService,
    private _snackBar: MatSnackBar,
  ) {
    this.formEditarReglamento = this.formBuilder.group({
      reglamento: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.obtenerClubParam();
    this.obtenerReglamento();
  }

  obtenerClubParam() {
    this.rutaActiva.params.subscribe({
      next: (
        (miParam: Params) => {
          this.clubParam = miParam['club'];
        }
      ),
      error: (
        (error: any) => {
          const mensaje = 'No pudimos obtener los usuarios registrados, intente más tarde.'
          this.openSnackBar(mensaje);
        }
      )
    })
  }

  obtenerReglamento() {
    this.reglamentoService.getReglamento(this.clubParam).subscribe((data: any) => {

      this.miReglamento = data;

      this.formEditarReglamento = this.formBuilder.group({
        reglamento: [this.miReglamento?.reglamento, [Validators.required]]
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

  openSnackBar(value: string) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      data: { mensaje: value },
      duration: 5000,
    });
  }

}


