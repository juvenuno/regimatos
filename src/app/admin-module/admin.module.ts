import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AddBlogEntryComponent } from './add-blog-entry/add-blog-entry.component';


@NgModule({
  declarations: [
    AdminComponent,
    AddProductComponent,
    AddBlogEntryComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
})
export class AdminModule { }
