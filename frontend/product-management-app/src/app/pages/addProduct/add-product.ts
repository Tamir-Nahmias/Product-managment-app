import { Component } from '@angular/core';
import { ProductFormComponent } from '../productForm/Product-form';

@Component({
  selector: 'add-product-page-app',
  imports: [ProductFormComponent],
  templateUrl: 'add-product.html',
})
export class AddProduct {
  constructor() {}
  //setting a constraint for mode . it can be either add or edit exclusevily.
  mode: 'add' | 'edit' = 'add';
}
