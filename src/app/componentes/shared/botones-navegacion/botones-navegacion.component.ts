import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-botones-navegacion',
  templateUrl: './botones-navegacion.component.html',
  styleUrls: ['./botones-navegacion.component.scss']
})
export class BotonesNavegacionComponent implements OnInit {

  @Input() urlVolver: any | undefined;
  @Input() urlHomeOCrear: any | undefined;
  @Input() textoVolver: string | undefined;
  @Input() textoHomeOCrear: string | undefined;

  @Output() cancelarImg: EventEmitter<any> = new EventEmitter();

  esHome: boolean = false;
  clubParam!:string;


  constructor(private router: Router, private rutaActiva: ActivatedRoute) { }

  ngOnInit(): void {
      this.rutaActiva.params.subscribe((miParam: Params) => {
        this.clubParam = miParam['club'];
        console.log("This.clubParam: ", this.clubParam)
      })
    this.esHome = this.router.url == `/${this.clubParam}`
  }

  cancelar() {
    this.cancelarImg.emit();
  }

}
