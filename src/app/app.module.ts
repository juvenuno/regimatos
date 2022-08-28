import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFirestoreModule} from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

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
    AngularFireModule.initializeApp(environment.firebase), // firebase auth ui
    provideFirebaseApp(() => initializeApp(environment.firebase)), //firestore
    provideFirestore(() => getFirestore()), //firestore
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
  ],
  providers: [{ provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 5000 } }],
  bootstrap: [AppComponent],
  entryComponents: [FirebaseAuthUiComponent]
})
export class AppModule { }
