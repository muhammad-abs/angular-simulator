import { Routes } from '@angular/router';
import { productResolver } from './product.resolver';

export const productsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./products/products.component').then((m) => m.ProductsComponent)
  },
  {
    path: 'cart',
    loadComponent: () => import('./cart/cart.component').then((m) => m.CartComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('./product-detail/product-detail.component').then((m) => m.ProductDetailComponent),
    resolve: {
      productDetails: productResolver
    }
  }
];