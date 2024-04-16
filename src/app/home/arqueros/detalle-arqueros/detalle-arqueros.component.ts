import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Arqueros } from 'src/app/modelos/arqueros.model';
import { HomeService } from 'src/app/servicios/home.service';

@Component({
  selector: 'app-detalle-arqueros',
  templateUrl: './detalle-arqueros.component.html',
  styleUrls: ['./detalle-arqueros.component.scss']
})
export class DetalleArquerosComponent implements OnInit {
  idParam!: string;
  arqueros!: Arqueros;

  constructor( private homeService: HomeService, private rutaActiva:ActivatedRoute ) { }

  ngOnInit(): void {

    this.rutaActiva.params.subscribe((miParam: Params) => {
      this.idParam = miParam['id'];
    })

    this.obtenerDetalleBolso( this.idParam );
  }

  obtenerDetalleBolso( id:any ){
    this.homeService.getDetalleArquero( id ).subscribe((data: any) => {
      this.arqueros = new Arqueros(data);
      console.log("this.arqueros: ", this.arqueros)
    })
  }
}
