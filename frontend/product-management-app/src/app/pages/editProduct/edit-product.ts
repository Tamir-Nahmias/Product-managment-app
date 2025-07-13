import { Component, Input, OnInit } from '@angular/core';
import { ProductFormComponent } from '../productForm/Product-form';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'edit-product-page-app',
  imports: [ProductFormComponent],
  templateUrl: 'edit-product.html',
})
export class EditProduct implements OnInit {
  constructor(private urlParams: ActivatedRoute) {}
  selectedId: number = 0;
  ngOnInit(): void {
    const idParam = this.urlParams.snapshot.paramMap.get('id');
    this.selectedId = idParam ? +idParam : 0;
  }

  mode: 'add' | 'edit' = 'edit';
}
