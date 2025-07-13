import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ProductService } from '../../services/product-services';
import { Product } from '../../model/product-model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
//product form for "add" and "edit" according to component input
@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule, CommonModule],
  standalone: true,
  templateUrl: 'product-form.html',
  styleUrl: 'product-form.css',
})
export class ProductFormComponent implements OnInit {
  @Input() mode: 'add' | 'edit' = 'add';
  @Input() productId: number = 0;
  shownProduct: Product = {
    id: 0,
    name: '',
    price: 0,
    description: '',
    image: '',
    isSellable: false,
    itemsInStock: 0,
  };

  productForm!: FormGroup;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.buildForm();

    if (this.mode === 'edit') {
      this.productService
        .getProductById(this.productId)
        .subscribe((product) => {
          this.shownProduct = { ...product };
          // insert values after api call , to ensure "async" fields pupolation - getting done.
          this.productForm.patchValue(this.shownProduct);
        });
    }
  }

  buildForm() {
    this.productForm = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl(0, [Validators.required, Validators.min(0)]),
      description: new FormControl(''),
      image: new FormControl(
        '',
        Validators.pattern(/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i)
      ),
      isSellable: new FormControl(false),
      itemsInStock: new FormControl(0, [
        Validators.required,
        Validators.min(0),
        Validators.max(1000),
      ]),
    });
  }

  onSubmit() {
    if (this.productForm.invalid) return;

    const product: Product = {
      ...this.productForm.value,
      id: this.shownProduct?.id ?? 0,
    };

    if (this.mode === 'edit') {
      this.productService.updateProduct(product).subscribe(() => {
        alert('Product updated');
      });
    } else {
      this.productService.addProduct(product).subscribe(() => {
        alert('Product added');
        this.productForm.reset();
      });
    }
  }

  handleCancel() {
    this.router.navigateByUrl('/products');
  }

  get f() {
    return this.productForm.controls;
  }
}
