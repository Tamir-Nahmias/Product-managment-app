import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../model/product-model';
import { ProductService } from '../../services/product-services';
import { catchError, Observable } from 'rxjs';
@Component({
  selector: 'product-table-app',
  imports: [CommonModule, RouterModule],
  templateUrl: 'product-table.html',
  styleUrl: 'product-table.css',
})
export class ProductTableComp implements OnInit {
  products$!: Observable<Product[]>;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.loadProducts().subscribe();
    this.products$ = this.productService.products$;
  }

  trackById(index: number, product: Product): number {
    return product.id;
  }
  handleDelete(id: number) {
    this.productService
      .deleteProduct(id)
      .pipe(
        catchError((err) => {
          console.error('error', err);
          return [];
        })
      )
      .subscribe(() => {
        console.log(`product ${id} deleted successfuly`);
        window.alert('product deleted');
      });
  }
}
