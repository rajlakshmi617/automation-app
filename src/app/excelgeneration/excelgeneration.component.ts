import { Component, Inject, Injectable, ViewChild, ElementRef } from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {BehaviorSubject, Observable, from} from 'rxjs';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { SnackBarComponent } from '../shared/component/snack-bar-component';
import {map, startWith} from 'rxjs/operators';
import {FileService} from '../file.service';
/**
 * Json node data with nested structure. Each node has a filename and a value or a list of children
 */

 export class FileNode{
    children: FileNode[];
    filename: string;
    type: any;
 }

/**
 * DialogData for modal popup
 */
export interface DialogData {
  dirname: string;
  filename: string;
}

@Component({
  selector: 'app-excelgeneration',
  templateUrl: './excelgeneration.component.html',
  styleUrls: ['./excelgeneration.component.css'],
  providers: [FileService]
})
export class ExcelgenerationComponent{
  @ViewChild('fileUploader', null) fileUploader:ElementRef;
  AutomationForm :  FormGroup;
  myControl = new FormControl();
  
  options : string[] =['one', 'two', 'three'];
  requestType: string[] = ['GET', 'POST', 'PUT', 'DELETE'];
  expectedResponseCode: string[] = ['200', '204', '404', '500'];
  dataTypeOptions : string[] = ['String', 'Numeric'];
  dataTypeFilterOptions: Observable<string[]>;
  requestTypeFilteredOptions: Observable<string[]>;   
  responseTypeFilterOptions : Observable<string[]>;
  
  public panelOpenState = true;
  /**
   * steps for expand and collapse collasable area
   */
  step = 0;
  setStep(index: number) {
    this.step = index;
  }

  public data:any;
  public fileName: string;
  public endPointURL : string;
  public testDescription : string;
  public requestTypeControl : any;
  public responseCodeControl : any;

  uploadFilePath : string;
  nestedTreeControl: NestedTreeControl<FileNode>;
  nestedDataSource: MatTreeNestedDataSource<FileNode>;
  public TREE_DATA: any;
  uploadFileFlag : boolean;
  uploadFileCheck : boolean;
  dropFileFlag:boolean;
  public validForm : boolean;
  public showContainer = true;
  dirname: string;
  filename: string;
  constructor(private service:FileService, private fb : FormBuilder, public dialog: MatDialog) { 

    this.AutomationForm = this.fb.group({
      endPointURL : ["", Validators.required],
      testDescription : [""],
      requestTypeControl : ["", Validators.required],
      responseCodeControl : ["", Validators.required]
    });

    this.nestedTreeControl = new NestedTreeControl<FileNode>
    (this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();
    this.service.dataChange.subscribe(data => this.nestedDataSource.data = data);
  }
  hasNestedChild = (_: number, nodeData: FileNode) => !nodeData.type;
  private _getChildren = (node: FileNode) => node.children;

  /**
   * Function to upload input JSON file using Browse Button
   * @param event 
   */

  uploadFile(event) {
    this.uploadFileFlag = true;
    this.uploadFileCheck = true;
    this.uploadFilePath = event.target.value;
    if (event.target.files.length !== 1) {
      console.error('No file selected');
    } else {
      const reader = new FileReader();
      reader.onloadend = (e) => {
        this.data = reader.result.toString();
      };
      reader.readAsText(event.target.files[0]);
    }
    if(this.uploadFileFlag === true){
      this.fileName = null;
    }
    this.uploadFileFlag = false;
  }

  /**
   * Function to handle ondrop event during file upload using drag and drop
   * @param ev 
   */

  dropHandler(ev) {
    this.dropFileFlag = true;
    this.fileUploader.nativeElement.value = null;
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
    this.uploadFilePath = ev.dataTransfer.files[0].name; //only name coming
    if (ev.dataTransfer.items) {  
      // Use DataTransferItemList interface to access the file(s)
      for (var i = 0; i < ev.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (ev.dataTransfer.items[i].kind === 'file') {
          var file = ev.dataTransfer.items[i].getAsFile();
          // console.log('-->1','... file[' + i + '].name = ' + file.name);
          this.fileName = file.name;
          const reader = new FileReader();
          reader.onloadend = (e) => {
            this.data = reader.result.toString();
          };
          reader.readAsText(ev.dataTransfer.files[0]);
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (var i = 0; i < ev.dataTransfer.files.length; i++) {
        // console.log('-->2','... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
      }
    }
  }

  /**
   * Function call on drag over during file drop to prevent file being opened
   * @param ev 
   */
  dragOverHandler(ev) {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  }

  /**
   * Function call to send tree data to service that will render JSON as a tree
   */
  renderjson(){
    this.showContainer = false;
    this.service.myMethod(this.data);
    this.step = 1;
    var AutoTestFormData ={
      "endPointURL" : this.AutomationForm.value.endPointURL,
      "testDescription" : this.AutomationForm.value.testDescription,
      "requestTypeControl" : this.AutomationForm.value.requestTypeControl,
      "responseCodeControl" : this.AutomationForm.value.responseCodeControl,
      "path" : this.uploadFilePath
    };
    // console.log(AutoTestFormData);
  }

  /**
   * Function called to generate JSON file using updated JSON tree data
   * @param dirName 
   * @param fileName 
   */
  exportJsonFile(dirName, fileName){
    console.log('this.data', this.data);
    console.log('this.nestedDataSource.data', this.nestedDataSource.data);
    const mockData = {
        Applications: {
          Calender: 'app1',
          Chrome: 'app1',
          Webstrom: 'app1'
        },
    }
    this.service.generateJsonFile(mockData, dirName, fileName);
  }

  /**
   * Function called to create folder to store generated JSON file
   */
  createFolder(){
    this.service.createDirectory();
  }

  ngOnInit() {
    this.uploadFileFlag =false;
    this.dropFileFlag = false;
    this.uploadFileCheck = false;
    var formData = this.AutomationForm.controls;
    this.dataTypeFilterOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value, this.dataTypeOptions))
    );

    this.requestTypeFilteredOptions = formData.requestTypeControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value, this.requestType))
    );

    this.responseTypeFilterOptions = formData.responseCodeControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value, this.expectedResponseCode))
    );     
  } 
  
  /**
   * Filter autocomplete options
   * @param value 
   * @param result 
   */
  private _filter(value: string, result: any): string[] { 
    const filterValue = value.toLowerCase(); 
    return result.filter(option => option.toLowerCase().includes(filterValue));    
  }
  
  generateKey(){
    console.log('to generate keys');
  }

  /**
   * To open model popup on click of save button
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '50px',
      data: {dirname: this.dirname, filename: this.fileName}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dirname = result.dirname;
      this.fileName = result.filename;
      this.exportJsonFile(this.dirname, this.fileName);
    });
  }

  /**
   * function to delete selected node
   * @param node 
   * @param dataSource 
   */
  deleteNode(node, dataSource){
    dataSource = dataSource.filter(n => n.filename != node.filename)
    dataSource.map((n) => {
      if(n.hasOwnProperty('children')){
        console.log('traverse', n['children']);
        if (n !== null && typeof(n)=="object" )
        {
          // console.log(n)
          this.deleteNode(node, n['children'])
          n['children'] = n['children'].filter(n => n.filename != node.filename) 
        }
      }
    });
    // console.log(dataSource)
    this.service.dataChange.next(dataSource)
  }
}

/**
 * Component for dialog overview that help to open model popup
 */
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: '../shared/component/dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {
  durationInSeconds = 3;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>, private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  openSnackBar(){
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

}


