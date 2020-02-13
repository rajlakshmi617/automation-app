import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {ReadFileAction, ReadFileFailureAction, ReadFileSuccessAction, FileSystemAction } from '../actions/fileSystem.action';
import {FileSystemActionTypes} from '../constant/fileSystem.constant';
import { mergeMap, map, catchError } from 'rxjs/Operators';
import { of} from 'rxjs';
import {FileSystemService} from '../../shared/services/fileSystem.service';



@Injectable()
export class FileSystemEffects {
    @Effect() readFile$ = this.actions$
        .pipe(
            ofType<FileSystemAction>(FileSystemActionTypes.READ_FILE),
            mergeMap(
                () => this.fsService.getFileList()
                .pipe(
                    map(data => new ReadFileSuccessAction(data)),
                    catchError(error => of(new ReadFileFailureAction(error)))
                )
            )
        )

        constructor(private actions$ : Actions, public fsService : FileSystemService){}
}