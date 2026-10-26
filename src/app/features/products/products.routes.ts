import { Routes } from '@angular/router';
import { productResolver } from './resolvers/product.resolver';

export const productsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/products/products.component').then((m) => m.ProductsComponent)
  },
  {
    path: 'cart',
    loadComponent: () => import('../cart/components/cart/cart.component').then((m) => m.CartComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('./components/product-detail/product-detail.component').then((m) => m.ProductDetailComponent),
    resolve: {
      productDetails: productResolver
    }
  }
];