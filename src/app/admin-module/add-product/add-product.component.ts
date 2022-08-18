import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css', '../admin.component.css']
})
export class AddProductComponent {

  form: FormGroup;

  constructor(
    private firestore: AngularFirestore,
    private formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group(new Product())
  }

  submitForm() {
    const product = this.form.value
    console.log(product)

    this.firestore.collection('products').add(product);
  }
}

export class Product {
  constructor(
    public name: string = '',
    public description: string = ''
  ){}
}
