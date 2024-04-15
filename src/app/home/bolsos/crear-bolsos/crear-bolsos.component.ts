import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HomeService } from 'src/app/servicios/home.service';

@Component({
  selector: 'app-crear-bolsos',
  templateUrl: './crear-bolsos.component.html',
  styleUrls: ['./crear-bolsos.component.scss']
})
export class CrearBolsosComponent implements OnInit {

  formCrearBolso:FormGroup;

  constructor( private formBuilder:FormBuilder, private home:HomeService ) { 
    
    this.formCrearBolso = this.formBuilder.group({
      nombreBolso:['', [Validators.required]],
      arquero:['', [Validators.required]],
      partes:['', [Validators.required]],
      rastreo:['', [Validators.required]],
      estado:['', [Validators.required]]
    }) 

   }

  ngOnInit(): void {}

  crearBolso(){

    const dataFormulario = {
      id : '1',
      nombreBolso : this.formCrearBolso.get('nombreBolso')?.value,
      arquero : this.formCrearBolso.get('arquero')?.value,
      partes : this.formCrearBolso.get('partes')?.value,
      rastreo : this.formCrearBolso.get('rastreo')?.value,
      estado : this.formCrearBolso.get('estado')?.value
    }

    this.home.crearBolso( dataFormulario ).subscribe(
      (data:any) => {
        console.log("data: ", data)
    })

  }

}
