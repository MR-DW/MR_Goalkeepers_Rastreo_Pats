import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/servicios/home.service';
import { SnackBarComponent } from '../../shared/snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-reglamento',
  templateUrl: './reglamento.component.html',
  styleUrls: ['./reglamento.component.scss']
})
export class ReglamentoComponent implements OnInit {

  miReglamento!:any;
  mensajeCompoVacio!:boolean;
  estaLogueado!:boolean;

  constructor( 
    private homeService: HomeService,
    private _snackBar: MatSnackBar,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.obtenerTokenLogin();
    this.obtenerReglas();
  }

  obtenerTokenLogin(){
    this.estaLogueado = this.loginService.estaLogueado() ? true : false;
  }

  obtenerReglas(){
    this.homeService.getReglamento().subscribe((resp:string)=>{
      
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
