import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ProductService } from '../../services/product-services';
import { map, Observable } from 'rxjs';
import { Product } from '../../model/product-model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'product-details-app',
  imports: [CommonModule, FormsModule],
  templateUrl: 'product-details.html',
  styleUrl: 'product-details.css',
})
export class ProductDetails implements OnInit {
  // @Input() filteringId: number | null = null;
  searchedProduct: string = '';
  selectedId: number | null = null;
  products$!: Observable<Product[]>;

  constructor(
    private productServices: ProductService,
    private urlParams: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.urlParams.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      this.selectedId = idParam ? +idParam : null;
      this.updateFilteredProducts();
    });
  }

  // when search input changes it triggers updateFilteredProducts() again to obtain
  // updatedproducts observeable from service:
  onSearchChange(): void {
    this.updateFilteredProducts();
  }

  updateFilteredProducts(): void {
    //for the use of search box by string
    const nameSearch = this.searchedProduct.trim().toLowerCase();
    //for the use of url params , when page is called with id in params
    const idFilter = this.selectedId;

    this.products$ = this.productServices.products$.pipe(
      map((products) => {
        let result = products;

        // for case receing a valid id from url params
        if (idFilter !== null && !isNaN(idFilter)) {
          result = result.filter((p) => p.id === idFilter);
        }

        //can work simulatanously with id filtering (altough unncceesry)
        if (nameSearch) {
          result = result.filter((p) =>
            p.name.toLowerCase().includes(nameSearch)
          );
        }

        return result;
      })
    );
  }

  trackById(index: number, product: Product): number {
    return product.id;
  }
}
