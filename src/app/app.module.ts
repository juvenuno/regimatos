import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServicesComponent } from './services/services.component';
import { BlogComponent } from './blog/blog.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import { HomeComponent } from './home/home.component';
import { FirebaseAuthUiComponent } from './firebase-auth-ui/firebase-auth-ui.component';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    ServicesComponent,
    BlogComponent,
    ProductsComponent,
    ProductComponent,
    HomeComponent,
    FirebaseAuthUiComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [FirebaseAuthUiComponent]
})
export class AppModule { }
