import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-crear-bolsos',
  templateUrl: './crear-bolsos.component.html',
  styleUrls: ['./crear-bolsos.component.scss']
})
export class CrearBolsosComponent implements OnInit {

  formCrearBolso:FormGroup;

  constructor( private formBuilder:FormBuilder ) { 
    
    this.formCrearBolso = this.formBuilder.group({
      nombreBolso:[''],
      arquero:[''],
      partes:['']
    }) 

   }

  ngOnInit(): void {}

  crearBolso(){
    
  }

}
