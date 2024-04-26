import { Component, Input, OnInit } from '@angular/core';
import { Arqueros } from 'src/app/modelos/arqueros.model';
import { Bolso } from 'src/app/modelos/bolso.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {

  urlImgBolso:string = '';
  bolso!: Bolso;
  bolsoId!:string;
  @Input() detalleBolso: any;
  @Input() idBolso: any;
  arquero!: Arqueros;
  @Input() detalleArquero: any;

  constructor() { }

  ngOnInit(): void {
    this.urlImgBolso = environment.urlImgBolso;
    this.bolso = this.detalleBolso;
    this.bolsoId = this.idBolso;
    this.arquero = this.detalleArquero;
  }

}
