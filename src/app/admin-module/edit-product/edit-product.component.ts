import { Component } from '@angular/core';
import { Firestore, collection, query, where, getDocs, doc, updateDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/product/product.component';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css', '../admin.component.css']
})
export class EditProductComponent {

  products: Product[] = []
  noProducts = false;
  loading = false;
  selectedProduct: Product | undefined = undefined
  form: FormGroup;

  constructor(
    private firestore: Firestore,
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
  ) { 
    this.form = this.formBuilder.group(new FormProduct())
  }

  async getProducts(category: string) {
    this.loading = true;
    const prodCollection = collection(this.firestore, 'products');
    const q = query(prodCollection, where("type", "==", category));
    const querySnapshot = await getDocs(q);
    this.products = []

    console.log("getting products");

    if (querySnapshot.size === 0) {
      this.noProducts = true;
    } else {
      this.noProducts = false;
    }

    querySnapshot.forEach((doc) => {
      this.products.push({
        name: doc.data()['name'],
        description: doc.data()['description'],
        type: doc.data()['type'],
        imageUrl: doc.data()['imageUrl'],
        timestamp: doc.data()['timestamp'],
        id: doc.id
      })
    });

    this.selectedProduct = undefined;
    this.loading = false;
  }

  selectProduct(id?: string) {
    this.selectedProduct = this.products.find(prod => prod.id === id);
    this.form.controls['name'].setValue(this.selectedProduct?.name);
    this.form.controls['description'].setValue(this.selectedProduct?.description);
  }

  unselectProduct() {
    this.selectedProduct = undefined;
  }

  saveChanges() {
    this.loading = true;

    console.log("saving changes")

    const docRef = doc(this.firestore, "products", this.selectedProduct!.id!)
    updateDoc(docRef, {
      name: this.form.value.name,
      description: this.form.value.description,
    }).then(
      docRef => {
        this.snackBar.open("Changes saved")
        this.getProducts(this.selectedProduct!.type)
      }
    ).catch(
      error => {
        this.snackBar.open("An error occured trying to save changes..")
        this.loading = false;
      }
    )
  }

  deleteProduct() {
    this.loading = true;
    console.log("deleting product")
    this.loading = false;
  }
}

class FormProduct {
  constructor(
    public name: string = '',
    public description: string = '',
  ){}
}
