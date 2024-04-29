import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalConfirmacionComponent } from 'src/app/componentes/shared/modal-confirmacion/modal-confirmacion.component';
import { HomeService } from 'src/app/servicios/home.service';

@Component({
  selector: 'app-editar-reglamento',
  templateUrl: './editar-reglamento.component.html',
  styleUrls: ['./editar-reglamento.component.scss']
})
export class EditarReglamentoComponent implements OnInit {

  formEditarReglamento!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private homeService: HomeService
  ) {
    this.formEditarReglamento = this.formBuilder.group({
      reglamento: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.homeService.getReglamento().subscribe((data: any) => {

      this.formEditarReglamento = this.formBuilder.group({
        reglamento: [ data, [Validators.required]]
      })
    })
  }

  editarReglamento() {

    const dataFormulario = {
      reglamento: this.formEditarReglamento.get('reglamento')?.value,
    }

    this.homeService.editarReglamento(dataFormulario).subscribe(
      (data: any) => {
        this.dialog.open(ModalConfirmacionComponent, {
          data: { mensaje: 'Reglamento editado', esCrear: false }
        });

        this.router.navigate(['/reglamento']);
      })
  }
}


