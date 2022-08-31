import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import  { MatInputModule } from '@angular/material/input';
import  { MatFormFieldModule } from '@angular/material/form-field';
import  { MatExpansionModule } from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import   {MatProgressBarModule} from '@angular/material/progress-bar';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AddBlogEntryComponent } from './add-blog-entry/add-blog-entry.component';
import { EditBlogEntryComponent } from './edit-blog-entry/edit-blog-entry.component';
import { EditProductComponent } from './edit-product/edit-product.component';


@NgModule({
  declarations: [
    AdminComponent,
    AddProductComponent,
    AddBlogEntryComponent,
    EditBlogEntryComponent,
    EditProductComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatInputModule,
    MatSelectModule, 
    MatProgressBarModule
  ],
})
export class AdminModule { }
