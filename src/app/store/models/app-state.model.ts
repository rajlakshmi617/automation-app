import {FileSystem} from '../models/fileSystem.model';
import { FileSystemState } from '../reducers/fileSystem.reducers';

export interface AppState {
    readonly fileSystem : FileSystemState
}