import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productCategory: String = "";

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.productCategory = params['cat'];
      console.log(this.productCategory);
    });
  }

  getHeaderImage(): string {
    const imagePath = "../../../assets/products/";
    switch(this.productCategory) { 
      case 'registers': { 
         return imagePath + "register.jpg"
      } 
      case 'pos': { 
        return imagePath + "POS2.jpg" 
      } 
      case 'slicers': { 
        return imagePath + "slicer.jpg" 
     } 
      case 'phones': { 
        return imagePath + "phone.jpg" 
      } 
      case 'scales': { 
        return imagePath + "scale.jpg" 
      } 
      case 'security-systems': { 
        return imagePath + "security.jpg" 
      } 
      default: { 
        return "" 
      } 
    } 
  }
}
