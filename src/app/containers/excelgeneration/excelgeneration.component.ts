import { Component, Inject, Injectable, ViewChild, ElementRef, OnInit } from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { SnackBarComponent } from '../../shared/component/snack-bar/snack-bar.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import {map, startWith} from 'rxjs/operators';
import {FileService} from '../../shared/services/file-service/file.service';
import { DialogOverviewExampleDialog } from '../../shared/component/mat-dialoge/dialoge-overview-example-dialoge.component';
/**
 * Json node data with nested structure. Each node has a filename and a value or a list of children
 */

 export class FileNode{
    children: FileNode[];
    filename: string;
    type: any;
    level:any
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
  @ViewChild(JsonEditorComponent, null) editor: JsonEditorComponent;
  AutomationForm :  FormGroup;
  myControl = new FormControl();
  
  option : string[] =['one', 'two', 'three'];
  requestType: string[] = ['GET', 'POST', 'PUT', 'DELETE'];
  expectedResponseCode: string[] = ['200', '204', '404', '500'];
  dataTypeOptions : string[] = ['String', 'Numeric'];
  dataTypeFilterOptions: Observable<string[]>;
  requestTypeFilteredOptions: Observable<string[]>;   
  responseTypeFilterOptions : Observable<string[]>;
  message:string;
  public panelOpenState = true;
  /**
   * steps for expand and collapse collasable area
   */
  step = 0;
  convertedData: any;
  setStep(index: number) {
    this.step = index;
  }

  public dataa:any;
  public data : any;
  public fileName: string;
  public endPointURL : string;
  public testDescription : string;
  public requestTypeControl : any;
  public responseCodeControl : any;
  public color = 'accent';
  public checked = false;
  public disabled = false;
  public jsonData :any;
  public changedData : any = [];
  public changeFlag : boolean;

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
  durationInSeconds = 3;
  fileResponse: any;
  options = new JsonEditorOptions();
  

  constructor(private service:FileService, private fb : FormBuilder, public dialog: MatDialog, private _snackBar: MatSnackBar) { 

    this.AutomationForm = this.fb.group({
      endPointURL : ["", Validators.required],
      testDescription : [""],
      requestTypeControl : ["", Validators.required],
      responseCodeControl : ["", Validators.required]
    });

    //json editor code
    this.options.mode = 'code';
    this.options.modes = ['code', 'text', 'tree', 'view'];
    this.options.statusBar = false;
    this.options.onChange = () => {
      this.changeFlag = true;
      this.changedData = this.editor.get();
    }

    this.nestedTreeControl = new NestedTreeControl<FileNode>
    (this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();
    this.service.dataChange.subscribe(data => this.nestedDataSource.data = data);
  }
  hasNestedChild = (_: number, nodeData: FileNode) => nodeData.children && nodeData.children.length > 0;
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
        this.jsonData = reader.result;
        this.dataa = reader.result.toString();      
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
            this.jsonData = reader.result;
            this.dataa = reader.result.toString();
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
    this.service.myMethod(this.dataa, 'tree');
    this.step = 1;
    var AutoTestFormData ={
      "endPointURL" : this.AutomationForm.value.endPointURL,
      "testDescription" : this.AutomationForm.value.testDescription,
      "requestTypeControl" : this.AutomationForm.value.requestTypeControl,
      "responseCodeControl" : this.AutomationForm.value.responseCodeControl,
      "path" : this.uploadFilePath
    };
  }

  /**
   * Function called to generate JSON file using updated JSON tree data
   * @param dirName 
   * @param fileName 
   */
  exportJsonFile(dirName, fileName){

    this.service.generateJsonFile(this.convertedData, this.changedData, dirName, fileName).subscribe((res)=> {
      this.fileResponse = JSON.parse(res);
      this.openSnackBar(this.fileResponse);
    });
  }

  /**
   * Function called to create folder to store generated JSON file
   */
  createFolder(){
    this.service.createDirectory();
  }

 


  /**
   * Change the div edit to editor
   */
  changed(){
    var convertedData = this.arrayToJson(this.nestedDataSource.data); 
    this.data = JSON.parse("{"+convertedData+"}");
    if(this.changeFlag){
      this.service.myMethod(this.changedData, 'editor');
      this.changeFlag = false;
    }else{
      this.service.myMethod(JSON.stringify(this.data), 'tree');
    } 
  }
  
  openSnackBar(message){
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: this.durationInSeconds * 1000,
      data: message,
    });
  }

  ngOnInit() {
    this.uploadFileFlag =false;
    this.dropFileFlag = false;
    this.uploadFileCheck = false;
    this.changeFlag = false;
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

  generateJson(data){ 
    console.log(data)
    //let tree = this.arrayToJson(data);  
    this.convertedData = "{" + this.arrayToJson(data) + "}";
    console.log(this.convertedData);
  }

  public arrayToJson(array) {
    let tree="";
    tree += array.map(e => {
      let n, isArr=false;
      if(e.children && e.children.length > 0){
        if(isNaN(parseInt(e.filename))){
          n = '"'+e.filename+'":';
        }else{
          n = "";         
        }
        if(!isNaN(parseInt(e.children[0].filename))){ isArr = true; }
         
         n += (isArr) ? "[" : "{";
        n+=this.arrayToJson(e['children'])
        n += (isArr) ? "]" : "}";                
      }else{
        if(e.type && isNaN(parseInt(e.filename))){
          n = '"'+e.filename+'"'+":"+'"'+e.type+'"';
        } else {
          n = e.type;
        }
      }
      //console.log(n)
      isArr = false;
      return n;
    });
    return tree;
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
        if (n !== null && typeof(n)=="object" )
        {
          this.deleteNode(node, n['children'])    //to traverse deep in the tree
          n['children'] = n['children'].filter(n => n.filename != node.filename) 
          return;
        }
      }
    });
    console.log(dataSource);
    this.service.dataChange.next(dataSource)
  }

  /**
   * function to insert the new item in the selected node
   * @param node //selected node
   * @param dataSource // Tree data
   */  
   addNode(node, dataSource) {    
    if(node == 'parentnode'){
      dataSource.push(new FileNode())
    } else {
      dataSource.map((n) => {              
        if (n !== null && typeof(n)=="object" )
        {           
          if(n.filename == node.filename){
            if(!n.hasOwnProperty('children')){
              n.children = [];
            }                      
            n['children'].push(new FileNode());   
            return;         
          } else if(Array.isArray(n['children'])){
            this.addNode(node, n['children'])     //to traverse deep in the tree
          }           
        }        
      });
    }
    
    this.service.dataChange.next(dataSource)    //updating tree dada
    this.nestedTreeControl.expand(node);        //expanding tree node where new node is added
  }
}




