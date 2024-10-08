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
  urlImgEquipamiento:string = '';
  listaBolsos: Bolso[]= [];
  listaArqueros: Arqueros[] = [];
  estaLogueago: any;

  @Input() listadoBolsos: Bolso[] = [];
  @Input() listadoArqueros: Arqueros[] = [];

  @Output() eliminar = new EventEmitter<any>();


  constructor( ) { }

  ngOnInit(): void {
    this.listaArqueros = this.listadoArqueros;
    this.listaBolsos = this.listadoBolsos;
    this.estaLogueago = sessionStorage.getItem('token');

  }

  eliminarBolso( id: number ){
    this.eliminar.emit( id );
  }

}


