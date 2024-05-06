import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-confirmacion',
  templateUrl: './modal-confirmacion.component.html',
  styleUrls: ['./modal-confirmacion.component.scss']
})
export class ModalConfirmacionComponent implements OnInit {

  mensaje:string | undefined;
  esCrear: boolean = false;
  clubParam!: string | undefined;

  constructor( @Inject(MAT_DIALOG_DATA) public data: any ) { }

  ngOnInit(): void {
    this.mensaje = this.data.mensaje;
    this.esCrear = this.data.esCrear;
    this.clubParam = this.data.clubParam
  }

}
