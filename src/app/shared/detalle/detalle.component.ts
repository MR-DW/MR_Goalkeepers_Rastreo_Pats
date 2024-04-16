import { Component, Input, OnInit } from '@angular/core';
import { Arqueros } from 'src/app/modelos/arqueros.model';
import { Bolso } from 'src/app/modelos/bolso.model';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {

  bolso!: Bolso;
  @Input() detalleBolso: any;

  arquero!: Arqueros;
  @Input() detalleArquero: any;

  constructor() { }

  ngOnInit(): void {
    this.bolso = this.detalleBolso;
    this.arquero = this.detalleArquero;
    console.log("this.arquero: ", this.arquero)
  }

}
