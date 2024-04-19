import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  version:string = '1.0.0'
  title = 'MR_Goalkeepers_Rastreo_Pats';
  esForm: boolean = false;


  constructor(private router: Router) { }

  ngOnInit(): void {
    this.isFormulario();
  }

  isFormulario(): boolean {
    return this.router.url.includes('/crear-') || this.router.url.includes('/editar-');
  }

}
