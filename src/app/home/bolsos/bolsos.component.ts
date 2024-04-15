import { Component, OnInit } from '@angular/core';
import { Bolso } from 'src/app/modelos/bolso.model';
import { HomeService } from 'src/app/servicios/home.service';

@Component({
  selector: 'app-bolsos',
  templateUrl: './bolsos.component.html',
  styleUrls: ['./bolsos.component.scss']
})
export class BolsosComponent implements OnInit {

  bolso:Bolso | undefined;

  constructor( private homeService: HomeService ) { }

  ngOnInit(): void {

    this.homeService.getBolsos().subscribe((data:any) => {
      console.log("data: ", data);
      this.bolso = new Bolso(data);
    })

  }

}
