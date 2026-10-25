import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProductResponce } from './interfaces/IProductResponce';
import { IProductCategories } from './interfaces/IProductCategories';
import { IProductDetails } from './interfaces/IProductDetails';
import { IProductQueryParams } from './interfaces/IProductQueryParams';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductApiService extends BaseApiService {
  
  override key: string = 'products';

  getProductById(id: number | string): Observable<IProductDetails> {
    return this.get<IProductDetails>(`/${ id }`);
  }

  getProductCategories(): Observable<IProductCategories[]> {
    return this.get<IProductCategories[]>('/categories');
  }

  getProducts(params: IProductQueryParams): Observable<IProductResponce> {
    let url: string = '';

    if (params.query) {
      url = '/search';
    } else if (params.category) {
      url = `/category/${ encodeURIComponent(params.category) }`;
    }

    return this.get<IProductResponce>(url, {
      limit: params.limit ?? 9,
      skip: params.skip ?? 0,
      sortBy: params.sortBy,
      order: params.order,
      q: params.query,
    });
  }
  
}