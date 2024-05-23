import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-el-equipamiento',
  templateUrl: './todo-el-equipamiento.component.html',
  styleUrls: ['./todo-el-equipamiento.component.scss']
})
export class TodoElEquipamientoComponent implements OnInit {

  mensajeCompoVacio: boolean = false;
  clubParam!: string;
  equipamiento: string[] = [ '--', 'Casco', 'Cuello', 'Pechera', 'Coderas', 'Guantes', 'Inguinal', 'Bermuda', 'Legguards', 'Kickers' ];

  constructor() { }

  ngOnInit(): void {
  }

}
