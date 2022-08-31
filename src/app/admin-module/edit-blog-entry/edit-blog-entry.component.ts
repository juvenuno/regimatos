import { Component, OnInit } from '@angular/core';
import { Firestore, collection, query, orderBy, getDocs, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BlogEntry } from 'src/app/blog/blog.component';
import { StorageService } from '../service/upload-service';

@Component({
  selector: 'app-edit-blog-entry',
  templateUrl: './edit-blog-entry.component.html',
  styleUrls: ['./edit-blog-entry.component.css', '../admin.component.css']
})
export class EditBlogEntryComponent implements OnInit {

  blogEntries: BlogEntry[] = []
  noBlogEntries = false;
  loading = false;
  selectedBlogEntry: BlogEntry | undefined = undefined
  form: FormGroup;

  constructor(
    private firestore: Firestore,
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private storageService: StorageService,
  ) { 
    this.form = this.formBuilder.group(new BlogEntryForm())
  }

  ngOnInit(): void {
    this.getBlogEntries();
  }

  async getBlogEntries() {
    this.loading = true;
    const prodCollection = collection(this.firestore, 'news');
    const q = query(prodCollection, orderBy("timestamp"));
    const querySnapshot = await getDocs(q);
    this.blogEntries = []
    this.selectedBlogEntry = undefined;

    console.log("getting blof entries");

    if (querySnapshot.size === 0) {
      this.noBlogEntries = true;
    } else {
      this.noBlogEntries = false;
    }

    querySnapshot.forEach((doc) => {
      this.blogEntries.push({
        title: doc.data()['title'],
        content: doc.data()['content'],
        imageUrl: doc.data()['imageUrl'],
        imageName: doc.data()['imageName'],
        timestamp: doc.data()['timestamp'],
        id: doc.id
      })
    });

    this.loading = false;
  }

  selectBlogEntry(id?: string) {
    this.selectedBlogEntry = this.blogEntries.find(item => item.id === id);
    this.form.controls['title'].setValue(this.selectedBlogEntry?.title);
    this.form.controls['content'].setValue(this.selectedBlogEntry?.content);
  }

  unselect() {
    this.selectedBlogEntry = undefined;
  }

  saveChanges() {
    this.loading = true;

    console.log("saving changes")

    const docRef = doc(this.firestore, "news", this.selectedBlogEntry!.id!)

    updateDoc(docRef, {
      title: this.form.value.title,
      content: this.form.value.content,
    }).then(
      docRef => {
        this.snackBar.open("Changes saved")
        this.getBlogEntries()
      }
    ).catch(
      error => {
        this.snackBar.open("An error occured trying to save changes..")
        this.loading = false;
      }
    )
  }

  deleteBlogEntry() {
    this.loading = true;
    console.log("deleting product")

    const docRef = doc(this.firestore, "news", this.selectedBlogEntry!.id!)

    deleteDoc(docRef).then(
      _ => {
        this.snackBar.open("Deleted")
        this.storageService.deleteFile("news", this.selectedBlogEntry!.imageName)
        this.getBlogEntries()
      }
    ).catch(
      error => {
        this.snackBar.open("An error occured trying to save changes..")
        this.loading = false;
      }
    )    
  }
}

class BlogEntryForm {
  constructor(
    public title: string = '',
    public content: string = '',
  ){}
}