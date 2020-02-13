import { Action } from '@ngrx/store';
import { FileSystem } from '../models/fileSystem.model';
import {FileSystemActionTypes} from '../constant/fileSystem.constant';


 
export class ReadFileAction implements Action {
    readonly type = FileSystemActionTypes.READ_FILE;

    // constructor(public payload: FileSystem){}
}

export class ReadFileSuccessAction implements Action {
    readonly type = FileSystemActionTypes.READ_FILE_SUCCESS;

    constructor(public payload: Array<FileSystem>){}
}

export class ReadFileFailureAction implements Action {
    readonly type = FileSystemActionTypes.READ_FILE_FAILURE;

    constructor(public payload: Error){}
}


export type FileSystemAction = ReadFileAction | ReadFileSuccessAction |  ReadFileFailureAction
