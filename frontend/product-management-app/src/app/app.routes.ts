import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home';
import { PageNotFound } from './pages/not-found/page-not-found';
import { ProductTableComp } from './pages/productTable/product-table';
import { AddProduct } from './pages/addProduct/add-product';
import { EditProduct } from './pages/editProduct/edit-product';
import { ProductDetails } from './pages/productDetail/product-details';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'products',
        component: ProductTableComp,
        children: [],
      },
      {
        path: 'add-product',
        component: AddProduct,
      },
      {
        path: 'product-details',
        children: [
          { path: '', component: ProductDetails },
          { path: ':id', component: ProductDetails },
        ],
      },
    ],
  },

  { path: 'edit-product/:id', component: EditProduct },
  { path: '**', component: PageNotFound },
];
