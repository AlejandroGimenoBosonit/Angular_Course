import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Heroes } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styles: [
  ]
})
export class ConfirmComponent implements OnInit {

  constructor( 
    private dialogRef: MatDialogRef<ConfirmComponent>,
    // Material injection to recieve data from parent component
    @Inject(MAT_DIALOG_DATA) public data: Heroes  
  ) { }

  ngOnInit(): void {
  }

  //  methods
  delete() {
    // recieve hero's information from component to dialog

    // close by dialog ref.
    this.dialogRef.close( true );
  }

  close() {
    // close by dialog ref.
    this.dialogRef.close( false );
  }

}
