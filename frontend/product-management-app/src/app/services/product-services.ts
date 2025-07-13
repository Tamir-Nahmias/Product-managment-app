import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Product } from '../model/product-model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private PRODUCT_URL = 'http://localhost:5282/api/products';

  //setting a "global" observable that corresponds to live db updates
  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();

  constructor(private httpClient: HttpClient) {}

  // first , loads all products from external source (back-end server)
  loadProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.PRODUCT_URL).pipe(
      tap((products) => this.productsSubject.next(products)),
      catchError((error) => {
        console.error(
          'error happend while loading products . check backend server is up',
          error
        );
        return of([]);
      })
    );
  }

  //add a new product in server, then update the local subject
  addProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.PRODUCT_URL, product).pipe(
      tap((newProduct) => {
        const current = this.productsSubject.value;
        this.productsSubject.next([...current, newProduct]);
      })
    );
  }

  //first , updating the product in server side then it's being updated localy in services
  updateProduct(product: Product): Observable<Product> {
    const url = `${this.PRODUCT_URL}/${product.id}`;
    return this.httpClient.put<Product>(url, product).pipe(
      tap((updatedProduct) => {
        const current = this.productsSubject.value;
        const updatedList = current.map((p) =>
          p.id === updatedProduct.id ? updatedProduct : p
        );
        this.productsSubject.next(updatedList);
      })
    );
  }

  // sending a delet request to server , once it's getting done then  updates the local subject obserable product
  deleteProduct(id: number): Observable<void> {
    const url = `${this.PRODUCT_URL}/${id}`;
    return this.httpClient.delete<void>(url).pipe(
      tap(() => {
        const current = this.productsSubject.value;
        this.productsSubject.next(current.filter((p) => p.id !== id));
      })
    );
  }

  //use of behaviorSubject here isn't neccesry for get product by id. only a GET rquest to server
  getProductById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.PRODUCT_URL}/${id}`);
  }
}
