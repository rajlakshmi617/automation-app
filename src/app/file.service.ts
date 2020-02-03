import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';

/**
 * Json node data with nested structure. Each node has a filename and a value or a list of children
 */

export class FileNode{
  children: FileNode[];
  filename: string;
  type: any;
}

 /**
 * File database, it can build a tree structured Json object from string.
 * Each node in Json object represents a file or a directory. For a file, it has filename and type.
 * For a directory, it has filename and children (a list of files or directories).
 * The input will be a json object string, and the output is a list of `FileNode` with nested
 * structure.
 */

@Injectable({
  providedIn: 'root'
})
export class FileService {
  dataChange = new BehaviorSubject<FileNode[]>([]);
  get data(): FileNode[] { return this.dataChange.value; }
  myMethod$: Observable<any>;
  private myMethodSubject = new Subject<any>();
  readonly baseURL = "http://localhost:3000/generate";
  constructor(private http: HttpClient) { 
    this.myMethod$ = this.myMethodSubject.asObservable();
  }
  myMethod(data) {
    // I have data! Let's return it so subscribers can use it!
    // we can do stuff with data if we want
    this.myMethodSubject.next(data);
    this.initialize(data);
  }
  generateJsonFile(){
    console.log('inside service');
      let student = { 
      name: 'Mike',
      age: 23, 
      gender: 'Male',
      department: 'English',
      car: 'Honda' 
    };
let studentdata = JSON.stringify(student);
debugger
    // console.log('this.http.post(this.baseURL, this.data);', this.http.get(this.baseURL));
    // fetch(this.baseURL).then(res=> console.log('--->',res));
     return this.http.get(this.baseURL);
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
