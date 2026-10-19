import { inject, Injectable, signal } from '@angular/core';
import { ProductApiService } from './product-api.service';
import { map, Observable, tap } from 'rxjs';
import { IProductDetails } from './interfaces/IProductDetails';
import { IProductCategories } from './interfaces/IProductCategories';
import { IProductResponce } from './interfaces/IProductResponce';
import { ProductSorts } from './enums/ProductSorts';
import { ProductSortOrder } from './enums/ProductSortOrder';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  
  productsApiService: ProductApiService = inject(ProductApiService);
  
  getProductById(id: number | string): Observable<IProductDetails> {
    return this.productsApiService.getProductById(id);
  }
  
  getProductCategories(): Observable<IProductCategories[]> {
    return this.productsApiService.getProductCategories();
  }
  
  getProducts(
    query: string, 
    category: string, 
    sortBy: ProductSorts, 
    order: ProductSortOrder, 
    limit: number, 
    skip: number
  ): Observable<IProductResponce> {
    return this.productsApiService.getProducts(query, category, sortBy, order, limit, skip);
  }
  
}
