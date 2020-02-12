import { Component, Inject, OnInit } from '@angular/core';
import {FileService} from '../../services/file-service/file.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';


/**
 * DialogData for modal popup
 */
export interface DialogData {
    dirname: string;
    filename: string;
  }

/**
 * Component for dialog overview that help to open model popup
 */
@Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: 'dialog-overview-example-dialog.html',
    providers: [FileService]
  })
  export class DialogOverviewExampleDialog implements OnInit {
    message:string;
    constructor(
      public dialogRef: MatDialogRef<DialogOverviewExampleDialog>, private _snackBar: MatSnackBar, private service:FileService,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
   
    ngOnInit(){
      this.service.currentMessage.subscribe(message => this.message = message)
    }
    
  
  }