import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Bolso } from 'src/app/modelos/bolso.model';
import { BolsosService } from 'src/app/servicios/bolsos.service';

@Component({
  selector: 'app-detalle-bolsos',
  templateUrl: './detalle-bolsos.component.html',
  styleUrls: ['./detalle-bolsos.component.scss']
})
export class DetalleBolsosComponent implements OnInit {

  idParam!: string;
  bolso!: Bolso;
  clubParam!:string;

  constructor( 
    private rutaActiva:ActivatedRoute,
    private bolsosService:BolsosService
   ) { }

  ngOnInit(): void {

    this.rutaActiva.params.subscribe((miParam: Params) => {
      this.idParam = miParam['id'];
    })

    this.rutaActiva.params.subscribe((miParam: Params) => {
      this.clubParam = miParam['club'];
    })

    this.obtenerDetalleBolso( this.clubParam, this.idParam );
  }

  obtenerDetalleBolso( club:string, id:any ){
    this.bolsosService.getDetalleBolso( club, id ).subscribe((data: any) => {
      this.bolso = new Bolso(data);
    })
  }

}
