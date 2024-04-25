import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-botones-navegacion',
  templateUrl: './botones-navegacion.component.html',
  styleUrls: ['./botones-navegacion.component.scss']
})
export class BotonesNavegacionComponent implements OnInit {

  @Input() urlVolver: any | undefined;
  @Input() urlHomeOCrear: string | undefined;
  @Input() textoVolver: string | undefined;
  @Input() textoHomeOCrear: string | undefined;

  @Output() cancelarImg: EventEmitter<any> = new EventEmitter();

  esHome: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.esHome = this.router.url == '/'
  }

  cancelar() {
    this.cancelarImg.emit();
  }

}
