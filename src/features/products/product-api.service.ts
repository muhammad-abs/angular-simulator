import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProductResponce } from './interfaces/IProductResponce';
import { ProductSorts } from './enums/ProductSorts';
import { ProductSortOrder } from './enums/ProductSortOrder';
import { IProductCategories } from './interfaces/IProductCategories';
import { IProductDetails } from './interfaces/IProductDetails';

@Injectable({
  providedIn: 'root',
})
export class ProductApiService {
  
  private http: HttpClient = inject(HttpClient);
  private url: string = 'https://dummyjson.com/products';
  
  getProductById(id: number | string): Observable<IProductDetails> {
    return this.http.get<IProductDetails>(`${ this.url }/${ id }`);
  }
    
  getProductCategories(): Observable<IProductCategories[]> {
    return this.http.get<IProductCategories[]>(`${ this.url }/categories`);
  }
  
  getProducts(
    query: string,
    category: string,
    sortBy: ProductSorts,
    order: ProductSortOrder,
    limit: number = 9,
    skip: number = 0,
  ): Observable<IProductResponce> {
    let url: string = this.url;

    let params: HttpParams = new HttpParams()
      .set('limit', limit.toString())
      .set('skip', skip.toString());
    
    if (sortBy !== ProductSorts.EMPTY) {
      params = params.set('sortBy', sortBy);
    }

    if (order !== ProductSortOrder.EMPTY) {
      params = params.set('order', order);
    }  
    
    if (query) {
      url += '/search';
      params = params.set('q', query);
    } else if (category) {
      url += `/category/${ category }`;
    }

    return this.http.get<IProductResponce>(url, { params });
  }
  
}
