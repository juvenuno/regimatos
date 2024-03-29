import { Component } from '@angular/core';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';

export interface BlogEntry {
  title: string,
  content: string,
  imageUrl: string,
  imageName: string,
  timestamp: number,
  id?: string,
  dateStr?: string,
}

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {

  constructor(private firestore: Firestore) {
    this.getBlogEntries()
  }

  blogEntries: BlogEntry[] = [];
  noNews = false;

  private async getBlogEntries() {
    const prodCollection = collection(this.firestore, 'news');
    const q = query(prodCollection, where("title", "!=", ""));
    const querySnapshot = await getDocs(q);
    this.blogEntries = []
    
    if (querySnapshot.size === 0) {
      this.noNews = true;
    }
    querySnapshot.forEach((doc) => {
      this.blogEntries.push({
        title: doc.data()['title'],
        content: doc.data()['content'],
        imageUrl: doc.data()['imageUrl'],
        imageName: doc.data()['imageName'],
        timestamp: doc.data()['timestamp'],
        dateStr: new Date(doc.data()['timestamp']).toLocaleString()
      })
    });
  }
}
