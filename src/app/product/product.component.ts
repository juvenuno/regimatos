import { Component } from '@angular/core';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

interface Product{
  name: string,
  description: string,
  type: string,
  imageUrl: string,
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  productCategory: string = "";
  products: Product[] = []
  noProducts = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private firestore: Firestore,
  ) {

    this.activatedRoute.queryParams.subscribe(params => {
      this.productCategory = params['cat'];
      console.log(this.productCategory);
      this.getProducts(this.productCategory);
    });
  }

  private async getProducts(category: string) {
    const prodCollection = collection(this.firestore, 'products');
    const q = query(prodCollection, where("type", "==", category));
    const querySnapshot = await getDocs(q);
    this.products = []
    if (querySnapshot.size === 0) {
      this.noProducts = true;
    }
    querySnapshot.forEach((doc) => {
      this.products.push({
        name: doc.data()['name'],
        description: doc.data()['description'],
        type: doc.data()['type'],
        imageUrl: doc.data()['imageUrl'],
      })
    });
  }

  getHeaderImage(): string {
    const imagePath = "../../../assets/products/";
    switch(this.productCategory) { 
      case 'registers': { 
         return imagePath + "register.jpg"
      } 
      case 'pos': { 
        return imagePath + "POS2.jpg" 
      } 
      case 'slicers': { 
        return imagePath + "slicer.jpg" 
     } 
      case 'phones': { 
        return imagePath + "phone.jpg" 
      } 
      case 'scales': { 
        return imagePath + "scale.jpg" 
      } 
      case 'security-systems': { 
        return imagePath + "security.jpg" 
      } 
      default: { 
        return "" 
      } 
    } 
  }
}
