import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-botones-navegacion',
  templateUrl: './botones-navegacion.component.html',
  styleUrls: ['./botones-navegacion.component.scss']
})
export class BotonesNavegacionComponent implements OnInit {

  @Input() urlVolver: string | undefined;
  @Input() urlHomeOCrear: string | undefined;
  @Input() textoVolver: string | undefined;
  @Input() textoHomeOCrear: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
