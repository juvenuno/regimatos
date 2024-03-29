import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from '../service/upload-service';

@Component({
  selector: 'add-blog-entry',
  templateUrl: './add-blog-entry.component.html',
  styleUrls: ['./add-blog-entry.component.css', '../admin.component.css']
})
export class AddBlogEntryComponent {
  fileName = '';
  file: any
  saving = false;
  form: FormGroup;

  constructor(
    private firestore: AngularFirestore,
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private uploadService: StorageService,
  ) {
    this.form = this.formBuilder.group(new BlogEntry())
  }

  onFileSelected(event: any) {
    const newFile = event.target.files[0];

    if (newFile) {
      this.file = newFile;
      this.fileName = newFile.name;
    }
  }

  submitForm() {
    if (this.fileName === '') {
      this.snackBar.open("Please select one image for news entry");
      return;
    }

    this.saving = true;

    this.uploadService.saveFileToStorage('news', this.file).subscribe(
      url => this.saveNewsToFirestore(url)
    )
  }

  saveNewsToFirestore(imageUrl: string) {
    const blogEntry: BlogEntry = this.form.value
    blogEntry.imageUrl = imageUrl;
    blogEntry.imageName = this.fileName;
    blogEntry.timestamp = Date.now()

    this.firestore.collection('news').add(blogEntry).then(
      _ => {
        this.form = this.formBuilder.group(new BlogEntry());
        this.file = undefined;
        this.fileName = '';
        this.snackBar.open("Blog entry saved.");
        this.saving = false;
      }
    ).catch(
      err => {
        this.snackBar.open("Error while trying to save new blog entry.");
        console.log(err);
        this.saving = false;
      }
    );
  }
}

class BlogEntry {
  constructor(
    public title: string = '',
    public content: string = '',
    public imageUrl: string = '',
    public imageName: string = '',
    public timestamp: number = 0
  ){}
}
