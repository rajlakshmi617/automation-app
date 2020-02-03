import { Component, Inject, Injectable, ViewChild } from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import { FileService } from '../file.service';

export class FileNode{
  children: FileNode[];
  filename: string;
  type: any;
}

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
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  dataTypeOptions : string[] = ['String', 'Numeric'];
  filteredOptions: Observable<string[]>;
  public panelOpenState = true;
  step = 0;
  setStep(index: number) {
    this.step = index;
  }
  public data:any;
  public fileName: string;
  nestedTreeControl: NestedTreeControl<FileNode>;
  nestedDataSource: MatTreeNestedDataSource<FileNode>;
  public TREE_DATA: any;
  public showContainer = true;
  dataTypeFilterOptions: Observable<string[]>; 
  dirname: string;
  filename: string;
  constructor(private service:FileService, public dialog: MatDialog) { 
    
    this.nestedTreeControl = new NestedTreeControl<FileNode>
    (this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();
    this.service.dataChange.subscribe(data => this.nestedDataSource.data = data);
  }
  hasNestedChild = (_: number, nodeData: FileNode) => !nodeData.type;

  private _getChildren = (node: FileNode) => node.children;

  uploadFile(event) {
    if (event.target.files.length !== 1) {
      console.error('No file selected');
    } else {
      const reader = new FileReader();
      reader.onloadend = (e) => {
        this.data = reader.result.toString();
      };
      reader.readAsText(event.target.files[0]);
    }
  }

  dropHandler(ev) {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  
    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (var i = 0; i < ev.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (ev.dataTransfer.items[i].kind === 'file') {
          var file = ev.dataTransfer.items[i].getAsFile();
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

  dragOverHandler(ev) {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  }

  renderjson(){
    this.showContainer = false;
    this.service.myMethod(this.data);
    this.step = 1;
  }
  exportJsonFile(dirName, fileName){
    console.log('inside component');
    this.service.generateJsonFile(this.data, dirName, fileName);
  }
  createFolder(){
    console.log('inside create folder component');
    this.service.createDirectory();
  }
  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value, 1))
    );

    this.dataTypeFilterOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value, 2))
      )
  }
  private _filter(value: string, flag: number = 1): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
    if(flag==1){
      return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }      
    else if(flag==2){
      return this.dataTypeOptions.filter(option => option.toLowerCase().includes(filterValue));
    }
  }

  treeData(node){
    console.log(this.nestedDataSource, node);
  }

  generateJson(data){
    console.log(data)
    let jsonObj = data;
    
  }

  generateKey(){
    console.log('to generate keys');
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '50px',
      data: {dirname: this.dirname, filename: this.fileName}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.dirname = result.dirname;
      this.fileName = result.filename;
      this.exportJsonFile(this.dirname, this.fileName);
    });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: '../shared/component/dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
