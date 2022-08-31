import { Injectable } from '@angular/core';

import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { from, Observable } from 'rxjs';
import { switchMap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

    constructor(private storage: AngularFireStorage) { }
  
  
    saveFileToStorage(storageSection: string, file: File): Observable<string> {
        const fileName = file.name;
        const metadata = {
            contentType: file.type
        }
        const fullPath = `${storageSection}/${fileName}`;
        const storageRef = this.storage.ref(fullPath);
        const uploadTask = storageRef.put(file, metadata);

        return  this.getDownloadUrl$(uploadTask, fullPath)
    }

    private getDownloadUrl$(
        uploadTask: AngularFireUploadTask,
        path: string,
      ): Observable<string> {
        return from(uploadTask).pipe(
          switchMap((_) => this.storage.ref(path).getDownloadURL()),
        );
    }

    public deleteFile(section: string, name: string): void {
        this.storage.ref(section).child(name).delete();
    }
}