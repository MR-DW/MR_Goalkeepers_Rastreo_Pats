import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/servicios/home.service';

@Component({
  selector: 'app-reglamento',
  templateUrl: './reglamento.component.html',
  styleUrls: ['./reglamento.component.scss']
})
export class ReglamentoComponent implements OnInit {

  miReglamento!:string;

  constructor( 
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    this.homeService.getReglamento().subscribe((resp:string)=>{
      this.miReglamento = resp;
    })
  }

}
