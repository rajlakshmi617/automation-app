import { Component } from '@angular/core';
import { FileService } from '../../file.service';


@Component({
    selector: 'snack-bar-component',
    templateUrl: 'snack-bar-component.html',
    providers: [FileService]
  })
export class SnackBarComponent {
    message:string;
    constructor(private service:FileService){
        console.log('inside snackbar', this.service);
        this.service.currentMessage.subscribe(message => {
            this.message = message
            console.log('msg', message)
        })
    }
    
}