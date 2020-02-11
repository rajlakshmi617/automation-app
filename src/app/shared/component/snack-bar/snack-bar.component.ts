import { Component, OnInit, Inject } from '@angular/core';
import { FileService } from '../../services/file-service/file.service';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material';



@Component({
    selector: 'snack-bar',
    templateUrl: 'snack-bar-component.html',
    providers: [FileService]
  })
export class SnackBarComponent{
    message:string;
    constructor(public snackBarRef: MatSnackBarRef<SnackBarComponent>,
        @Inject(MAT_SNACK_BAR_DATA) public data: any){
    }
}