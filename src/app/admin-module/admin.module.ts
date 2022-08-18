import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularFirestoreModule} from '@angular/fire/compat/firestore';
import  {MatInputModule} from '@angular/material/input';

import  { MatFormFieldModule } from '@angular/material/form-field';
import  { MatExpansionModule } from '@angular/material/expansion';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AddBlogEntryComponent } from './add-blog-entry/add-blog-entry.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminComponent,
    AddProductComponent,
    AddBlogEntryComponent
  ],
  imports: [
    CommonModule,
    
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatInputModule,
    AngularFirestoreModule
  ],
})
export class AdminModule { }
