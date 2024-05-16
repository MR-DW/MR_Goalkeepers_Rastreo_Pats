import { Component, Inject, OnInit, inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent implements OnInit {

  snackBarRef = inject(MatSnackBarRef);
  mensaje:string | undefined;

  constructor( 
    @Inject(MAT_SNACK_BAR_DATA) public data: any 
  ) { }

  ngOnInit(): void {
    this.mensaje = this.data.mensaje;
  }

}
