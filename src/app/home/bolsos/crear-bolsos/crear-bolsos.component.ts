import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Bolso } from 'src/app/modelos/bolso.model';
import { HomeService } from 'src/app/servicios/home.service';

@Component({
  selector: 'app-crear-bolsos',
  templateUrl: './crear-bolsos.component.html',
  styleUrls: ['./crear-bolsos.component.scss']
})
export class CrearBolsosComponent implements OnInit {

  formCrearBolso:FormGroup;
  listaBolsos: Bolso[] = [];

  constructor( private formBuilder:FormBuilder, private homeService:HomeService ) { 
    
    this.formCrearBolso = this.formBuilder.group({
      nombreBolso:['', [Validators.required]],
      arquero:['', [Validators.required]],
      partes:['', [Validators.required]],
      rastreo:['', [Validators.required]],
      estado:['', [Validators.required]]
    }) 

   }

  ngOnInit(): void {
    // Ver si puedo no llamar al servicio de nuevo y utilizar el servicio del componente bolsos.
    this.homeService.getBolsos().subscribe((data:any) => {
      for (let bolso of data){
        this.listaBolsos.push(new Bolso(bolso));
      }
    })
  }

  crearBolso(){

    const dataFormulario = {
      id : '1',
      nombreBolso : this.formCrearBolso.get('nombreBolso')?.value,
      arquero : this.formCrearBolso.get('arquero')?.value,
      partes : this.formCrearBolso.get('partes')?.value,
      rastreo : this.formCrearBolso.get('rastreo')?.value,
      estado : this.formCrearBolso.get('estado')?.value
    }

    this.listaBolsos.push(new Bolso(dataFormulario))
    
    this.homeService.crearBolso( this.listaBolsos ).subscribe(
      (data:any) => {
        console.log("data: ", data)
    })

  }

}
