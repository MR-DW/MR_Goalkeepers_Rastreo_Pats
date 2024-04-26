import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Bolso } from 'src/app/modelos/bolso.model';
import { HomeService } from 'src/app/servicios/home.service';

@Component({
  selector: 'app-detalle-bolsos',
  templateUrl: './detalle-bolsos.component.html',
  styleUrls: ['./detalle-bolsos.component.scss']
})
export class DetalleBolsosComponent implements OnInit {

  idParam!: string;
  bolso!: Bolso;

  constructor( private homeService: HomeService, private rutaActiva:ActivatedRoute ) { }

  ngOnInit(): void {

    this.rutaActiva.params.subscribe((miParam: Params) => {
      this.idParam = miParam['id'];
    })

    this.obtenerDetalleBolso( this.idParam );
  }

  obtenerDetalleBolso( id:any ){
    this.homeService.getDetalleBolso( id ).subscribe((data: any) => {
      this.bolso = new Bolso(data);
    })
  }

}
