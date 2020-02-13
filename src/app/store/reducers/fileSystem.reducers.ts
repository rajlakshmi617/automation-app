import {FileSystem} from '../models/fileSystem.model';
import { FileSystemAction } from '../actions/fileSystem.action';
import { FileSystemActionTypes } from '../constant/fileSystem.constant';

export interface FileSystemState {
    list : FileList[],
    loading : boolean,
    error : Error
}

const initialState : FileSystemState = {
    list : [],
    loading : false,
    error : undefined
}

export function fileSystemReducer(state : FileSystemState = initialState, action: FileSystemAction){
    switch(action.type){

        case FileSystemActionTypes.READ_FILE :
        return {
            ...state,
            loading: true
        };

        case FileSystemActionTypes.READ_FILE_SUCCESS :
        return {
            ...state,
            list : action.payload,
            loading:false
        };

        case FileSystemActionTypes.READ_FILE_FAILURE :
        return {
            ...state,
            error : action.payload,
            loading: false
        };  

        default:
        return state;
    }
}