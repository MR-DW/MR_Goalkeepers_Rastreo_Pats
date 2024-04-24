import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  urlImgLogo!:string;
  constructor() { }

  ngOnInit(): void {
    this.urlImgLogo = environment.urlImg + 'logo.png?alt=media&token=0eacfb2c-f34f-4bef-85f0-e96ae9713d44';
  }

}
