import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Bolso } from 'src/app/modelos/bolso.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  
  listaBolsos: Bolso[] = [];
  @Input() listado: Bolso[] = [];
  @Output() eliminar = new EventEmitter<any>();


  constructor() { }

  ngOnInit(): void {
    this.listaBolsos = this.listado;
  }

  eliminarBolso( id: number ){
    this.eliminar.emit( id )
  }

}


