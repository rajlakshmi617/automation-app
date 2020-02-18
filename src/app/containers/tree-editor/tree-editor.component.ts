import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';

import {FileService} from '../../shared/services/file-service/file.service';
import { FileNode } from '../../shared/modals/Filenode';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'tree-editor',
  templateUrl: './tree-editor.component.html',
  styleUrls: ['./tree-editor.component.css']
})
export class TreeEditorComponent implements OnInit {

  @Input() nestedTreeControl: NestedTreeControl<FileNode>;
  @Input() nestedDataSource: MatTreeNestedDataSource<FileNode>;
  @Output() generateJson = new EventEmitter<MatTreeNestedDataSource<FileNode>>();


  myControl = new FormControl();

  constructor(private service:FileService) { 
    this.nestedTreeControl = new NestedTreeControl<FileNode>(this._getChildren);;
  }
  hasNestedChild = (_: number, nodeData: FileNode) => nodeData.children && nodeData.children.length > 0;
  private _getChildren = (node: FileNode) => node.children;

  ngOnInit() {
  }

  indexValidation(filename){
    return !isNaN(parseInt(filename));
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
          //console.log('n.filename', n.filename, node.filename, 'n.type', n.type, node.type)      
          if(n.filename == node.filename && (n.type == node.type)){
            let newNode = new FileNode();
            
            if(n.children && n.children.length>0 && !isNaN(parseInt(n.children[0].filename))){
              newNode.filename = n.children.length;
              newNode.children = [];                       
              newNode.children.push(new FileNode());
              n['children'].push(newNode);
              //console.log(n['children'])
            } else if(!n.hasOwnProperty('children')){
              n.children = [];
              n['children'].push(newNode);
            } else {
              n['children'].push(newNode);
            }                               
          } else if(Array.isArray(n['children'])){
            this.addNode(node, n['children'])     //to traverse deep in the tree
          }           
        }        
      });
    } 
    //console.log(dataSource);
    this.service.dataChange.next(dataSource)    //updating tree data
    this.nestedTreeControl.expand(node);        //expanding tree node where new node is added
  }

   /**
   * function to delete selected node
   * @param node 
   * @param dataSource 
   */
  deleteNode(node, dataSource){
    
    if(Array.isArray(dataSource)){
      dataSource = dataSource.filter(n => !((n.filename == node.filename) && (n.type == node.type)));
    }   
    dataSource.map((n) => {
      if(n.hasOwnProperty('children')){
        if (n !== null && typeof(n)=="object" )
        {
          this.deleteNode(node, n['children'])    //to traverse deep in the tree
          //console.log('n.filename', n.filename, node.filename, 'n.type', n.type, node.type)  
          n['children'] = n['children'].filter(n => !((n.filename == node.filename) && (n.type == node.type))) 
          return;
        }
      }
    });
    // console.log(dataSource);
    this.service.dataChange.next(dataSource)
    
  }

}