import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Arqueros } from 'src/app/modelos/arqueros.model';
import { Bolso } from 'src/app/modelos/bolso.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  

  imgBolso:string = '';
  listaBolsos: Bolso[]= [];
  listaArqueros: Arqueros[] = [];

  @Input() listadoBolsos: Bolso[] = [];
  @Input() listadoArqueros: Arqueros[] = [];

  @Output() eliminar = new EventEmitter<any>();


  constructor() { }

  ngOnInit(): void {
    this.imgBolso = environment.urlImg + '/Equipamiento-0.webp';

    this.listaArqueros = this.listadoArqueros;
    this.listaBolsos = this.listadoBolsos;
  }

  eliminarBolso( id: number ){
    this.eliminar.emit( id )
  }

}


