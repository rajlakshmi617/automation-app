import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs/Operators';
import { FileSystem } from '../../store/models/fileSystem.model';

@Injectable({
    providedIn: 'root'
  })
export class FileSystemService {
    private FILESYSTEM_URL = "http://localhost:3000/readdir";
    
      constructor(public http : HttpClient) { }
    
      getFileList(){
        return this.http.get<FileSystem[]>(this.FILESYSTEM_URL).pipe(delay(500));
      }
}
