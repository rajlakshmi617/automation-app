import { Component, Injectable, ViewChild } from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';

/**
 * Json node data with nested structure. Each node has a filename and a value or a list of children
 */

 export class FileNode{
    children: FileNode[];
    filename: string;
    type: any;
 }

 /**
 * The Json tree data in string. The data could be parsed into Json object
 */

 const TREE_DATA = JSON.stringify({
  Applications: {
    Calender: 'app',
    Chrome: 'app',
    Webstrom: 'app'
  },
  Documents: {
    angular: {
      src: {
        compiler: 'ts',
        core: 'ts'
      },
    },
    Material:{
      src: {
        button: 'ts',
        checkbox: 'ts'
      }
    }
  },
  Downloads:{
    october: 'pdf',
    november: 'pdf',
    december: 'doc'
  }
 });
 console.log('old data', TREE_DATA);
 /**
 * File database, it can build a tree structured Json object from string.
 * Each node in Json object represents a file or a directory. For a file, it has filename and type.
 * For a directory, it has filename and children (a list of files or directories).
 * The input will be a json object string, and the output is a list of `FileNode` with nested
 * structure.
 */

 @Injectable()
 export class FileDatabase {
  dataChange = new BehaviorSubject<FileNode[]>([]);
  get data(): FileNode[] { return this.dataChange.value; }
  myMethod$: Observable<any>;
  private myMethodSubject = new Subject<any>();
  constructor() {
    this.myMethod$ = this.myMethodSubject.asObservable();
    // this.initialize();
  }
  myMethod(data) {
    // console.log(data); // I have data! Let's return it so subscribers can use it!
    // we can do stuff with data if we want
    this.myMethodSubject.next(data);
    this.initialize(data);
  }
  initialize(treedata){
    // Parse the string to json object.
    const stringyData = JSON.stringify(treedata);
    const dataObject = JSON.parse(stringyData);
    // Build the tree nodes from Json object. The result is a list of `FileNode` with nested
    // file node as children.
    const data = this.buildFileTree(JSON.parse(dataObject), 0);

    // Notify the change.
    this.dataChange.next(data);
  }
  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `FileNode`.
   */
  buildFileTree(obj: {[key: string]: any}, level: number): FileNode[] {
    return Object.keys(obj).reduce<FileNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new FileNode();
      node.filename = key;

      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.type = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }
 }

@Component({
  selector: 'app-excelgeneration',
  templateUrl: './excelgeneration.component.html',
  styleUrls: ['./excelgeneration.component.css'],
  providers: [FileDatabase]
})
export class ExcelgenerationComponent{
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  dataTypeOptions : string[] = ['String', 'Numeric'];
  filteredOptions: Observable<string[]>;
  public data:any = TREE_DATA;
  public fileName: string;
  nestedTreeControl: NestedTreeControl<FileNode>;
  nestedDataSource: MatTreeNestedDataSource<FileNode>;
  public TREE_DATA: any;
  public showContainer = true;
  //optionType = "string";
  dataTypeFilterOptions: Observable<string[]>; 
  constructor(private service:FileDatabase) { 
    
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
          console.log('-->1','... file[' + i + '].name = ' + file.name);
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
        console.log('-->2','... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
      }
    }
  }

  dragOverHandler(ev) {
    console.log('File(s) in drop zone'); 
  
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  }

  renderjson(){
    this.showContainer = false;
    this.service.myMethod(this.data);
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
}
