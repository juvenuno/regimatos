import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuard } from '../firebase-auth-ui/admin-auth-guard.service';
import { AddBlogEntryComponent } from './add-blog-entry/add-blog-entry.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AdminComponent } from './admin.component';
import { EditBlogEntryComponent } from './edit-blog-entry/edit-blog-entry.component';
import { EditProductComponent } from './edit-product/edit-product.component';

const routes: Routes = [
  { 
    path: '', 
    component: AdminComponent ,
    canActivate: [ AdminAuthGuard ],
    children: [ 
      {
        path: 'add-product',
        component: AddProductComponent,
        canActivate: [ AdminAuthGuard ]
      },
      {
        path: 'edit-products',
        component: EditProductComponent,
        canActivate: [ AdminAuthGuard ]
      },
      {
        path: 'add-blog-entry',
        component: AddBlogEntryComponent,
        canActivate: [ AdminAuthGuard ]
      },
      {
        path: 'edit-blog-entries',
        component: EditBlogEntryComponent,
        canActivate: [ AdminAuthGuard ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
