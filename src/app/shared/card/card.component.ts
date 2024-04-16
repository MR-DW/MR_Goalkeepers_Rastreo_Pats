import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Arqueros } from 'src/app/modelos/arqueros.model';
import { Bolso } from 'src/app/modelos/bolso.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  
  listaBolsos: Bolso[]= [];
  listaArqueros: Arqueros[] = [];

  @Input() listadoBolsos: Bolso[] = [];
  @Input() listadoArqueros: Arqueros[] = [];

  @Output() eliminar = new EventEmitter<any>();


  constructor() { }

  ngOnInit(): void {
    this.listaArqueros = this.listadoArqueros;
    this.listaBolsos = this.listadoBolsos;
  }

  eliminarBolso( id: number ){
    this.eliminar.emit( id )
  }

}


