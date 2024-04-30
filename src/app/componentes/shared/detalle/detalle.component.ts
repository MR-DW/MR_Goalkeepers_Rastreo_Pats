import { Component, Input, OnInit } from '@angular/core';
import { Arqueros } from 'src/app/modelos/arqueros.model';
import { Bolso } from 'src/app/modelos/bolso.model';
import { LoginService } from 'src/app/servicios/login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {

  estaLogueado!:boolean;

  urlImgBolso:string = '';
  bolso!: Bolso;
  bolsoId!:string;
  @Input() detalleBolso: any;
  @Input() idBolso: any;
  
  arquero!: Arqueros;
  @Input() detalleArquero: any;
  @Input() idArquero: any;

  constructor( private loginService:LoginService ) { }

  ngOnInit(): void {
    this.obtenerTokenLogin();

    this.urlImgBolso = environment.urlImgBolso;
    this.bolso = this.detalleBolso;
    this.bolsoId = this.idBolso;
    this.arquero = this.detalleArquero;
  }

  obtenerTokenLogin(){
    this.estaLogueado = this.loginService.estaLogueado() ? true : false;
  }

}
