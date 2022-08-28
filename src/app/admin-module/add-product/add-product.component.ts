import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileUploadService } from '../service/upload-service';

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

  fileName = '';
  file: any
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
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private uploadService: FileUploadService,
    private firestore: AngularFirestore,
  ) {
    this.form = this.formBuilder.group(new Product())
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
      this.snackBar.open("Please select one image for product");
      return;
    }

    this.saving = true;

    this.uploadService.saveFileToStorage('products', this.file).subscribe(
      url => this.saveProductToFirestore(url)
    )
  }

  private saveProductToFirestore(imageUrl: string) {
    const product = this.form.value
    product.imageUrl = imageUrl
    console.log('saving product', product);

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
    public type: string = '',
    public imageUrl: string = ''
  ){}
}
