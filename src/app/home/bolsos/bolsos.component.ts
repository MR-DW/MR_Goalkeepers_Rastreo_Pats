import { Component, OnInit } from '@angular/core';
import { Bolso } from 'src/app/modelos/bolso.model';
import { HomeService } from 'src/app/servicios/home.service';

@Component({
  selector: 'app-bolsos',
  templateUrl: './bolsos.component.html',
  styleUrls: ['./bolsos.component.scss']
})
export class BolsosComponent implements OnInit {

  listaBolsos:Bolso[] = [];

  constructor( private homeService: HomeService ) { }

  ngOnInit(): void {

    this.homeService.getBolsos().subscribe((data:any) => {
      console.log("data: ", data);
      for (let bolso of data){
        this.listaBolsos.push(new Bolso(bolso));
      }
    })

    console.log("this.listaBolsos: ", this.listaBolsos);

  }

}
