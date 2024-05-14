import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';
import { ReglamentoService } from 'src/app/servicios/reglamento.service';
import { SnackBarComponent } from '../../shared/snack-bar/snack-bar.component';

@Component({
  selector: 'app-reglamento',
  templateUrl: './reglamento.component.html',
  styleUrls: ['./reglamento.component.scss']
})
export class ReglamentoComponent implements OnInit {

  miReglamento!:any;
  mensajeCompoVacio!:boolean;
  estaLogueado!:boolean;
  clubParam!:string;

  constructor( 
    private _snackBar: MatSnackBar,
    private loginService: LoginService,
    private rutaActiva: ActivatedRoute,
    private reglamentoService:ReglamentoService
  ) { }

  ngOnInit(): void {
    this.obtenerTokenLogin();
    this.obtenerClubParam();
    this.obtenerReglas();
  }

  obtenerTokenLogin(){
    this.estaLogueado = this.loginService.estaLogueado() ? true : false;
  }

  obtenerClubParam(){
    this.rutaActiva.params.subscribe((miParam: Params) => {
      this.clubParam = miParam['club'];
    })
  }

  obtenerReglas(){
    this.reglamentoService.getReglamento( this.clubParam ).subscribe((resp:string)=>{
      
      this.miReglamento = resp;

      if( this.miReglamento.reglamento != ''){
        this.mensajeCompoVacio = false;
      }
      else{
        this.mensajeCompoVacio = true;
      }

    },
  (error)=>{
    this._snackBar.openFromComponent(SnackBarComponent, {
      data: { mensaje: "No pudimos cargar su reglamento, intente nuevamente!"}, 
      duration: 5000,
    });
  })
  }

}
