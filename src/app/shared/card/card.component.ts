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
  
  bolsoNombre:string='';
  urlImgBolso:string = '';
  listaBolsos: Bolso[]= [];
  listaArqueros: Arqueros[] = [];

  @Input() listadoBolsos: Bolso[] = [];
  @Input() listadoArqueros: Arqueros[] = [];

  @Output() eliminar = new EventEmitter<any>();


  constructor() { }

  ngOnInit(): void {
    this.urlImgBolso = environment.urlImgBolso;

    console.log("this.urlImgBolso: ", this.urlImgBolso)

    this.listaArqueros = this.listadoArqueros;
    this.listaBolsos = this.listadoBolsos;
    console.log("this.listaBolsos: ", this.listaBolsos)
    console.log("urlImgBolso + bolso.urlImgBolso + '.jpg?alt=media': ", this.urlImgBolso + this.listaBolsos[0].urlImgBolso + '.jpg?alt=media')


  }

  eliminarBolso( id: number ){
    this.eliminar.emit( id )
  }

}


