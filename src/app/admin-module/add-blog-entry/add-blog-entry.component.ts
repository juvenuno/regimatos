import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'add-blog-entry',
  templateUrl: './add-blog-entry.component.html',
  styleUrls: ['./add-blog-entry.component.css', '../admin.component.css']
})
export class AddBlogEntryComponent {

  saving = false;
  form: FormGroup;

  constructor(
    private firestore: AngularFirestore,
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
  ) {
    this.form = this.formBuilder.group(new BlogEntry())
  }

  submitForm() {
    this.saving = true;
    const blogEntry = this.form.value
    console.log(blogEntry)

    this.firestore.collection('products').add(blogEntry).then(
      _ => {
        this.form = this.formBuilder.group(new BlogEntry());
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

export class BlogEntry {
  constructor(
    public title: string = '',
    public content: string = ''
  ){}
}
