import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Arqueros } from 'src/app/modelos/arqueros.model';
import { Bolso } from 'src/app/modelos/bolso.model';

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
    // this.imgBolso = environment.urlImg + '/Equipamiento-1.jpg';
    this.imgBolso = 'https://firebasestorage.googleapis.com/v0/b/mrgoalkeepers-rastreo-pats.appspot.com/o/Equipamiento-1.jpg?alt=media&token=6a54b5fa-e789-4a6a-a549-f5dcd9a10eff'

    this.listaArqueros = this.listadoArqueros;
    this.listaBolsos = this.listadoBolsos;
  }

  eliminarBolso( id: number ){
    this.eliminar.emit( id )
  }

}


