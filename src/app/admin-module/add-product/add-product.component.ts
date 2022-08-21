import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

interface ProductType {
  name: string,
  code: string
}

@Component({
  selector: 'add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css', '../admin.component.css']
})
export class AddProductComponent {

  saving = false;
  form: FormGroup;
  productTypes: ProductType[] = [
    { name: 'Cash register', code: 'registers' },
    { name: 'POS system', code: 'pos' },
    { name: 'Slicers', code: 'slicers' },
    { name: 'Smartphones', code: 'phones' },
    { name: 'Retail scales', code: 'scales' },
    { name: 'Security systems', code: 'security-systems' }
  ]

  constructor(
    private firestore: AngularFirestore,
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
  ) {
    this.form = this.formBuilder.group(new Product())
  }

  submitForm() {
    this.saving = true;
    const product = this.form.value
    console.log(product)

    this.firestore.collection('products').add(product).then(
      _ => {
        this.form = this.formBuilder.group(new Product());
        this.snackBar.open("Product details saved.");
        this.saving = false;
      }
    ).catch(
      err => {
        this.snackBar.open("Error while trying to save new product.");
        console.log(err);
        this.saving = false;
      }
    );
  }
}

export class Product {
  constructor(
    public name: string = '',
    public description: string = '',
    public type: string = ''
  ){}
}
