import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Arqueros } from 'src/app/modelos/arqueros.model';
import { ArquerosService } from 'src/app/servicios/arqueros.service';
import { HomeService } from 'src/app/servicios/home.service';

@Component({
  selector: 'app-detalle-arqueros',
  templateUrl: './detalle-arqueros.component.html',
  styleUrls: ['./detalle-arqueros.component.scss']
})
export class DetalleArquerosComponent implements OnInit {
  idParam!: string;
  arqueros!: Arqueros;
  clubParam!: string;

  constructor( 
    private arquerosService: ArquerosService, private rutaActiva:ActivatedRoute ) { }

  ngOnInit(): void {

    this.rutaActiva.params.subscribe((miParam: Params) => {
      this.idParam = miParam['id'];
    })

    this.rutaActiva.params.subscribe((miParam: Params) => {
      this.clubParam = miParam['club'];
    })

    this.obtenerDetalleArquero( this.clubParam, this.idParam );
  }

  obtenerDetalleArquero( club:string, id:any ){
    this.arquerosService.getDetalleArquero( club, id ).subscribe((data: any) => {
      this.arqueros = new Arqueros(data);
    })
  }
}
