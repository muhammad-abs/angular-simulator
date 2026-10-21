
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProductResponce } from './interfaces/IProductResponce';
import { ProductSort } from './enums/ProductSort';
import { ProductSortOrder } from './enums/ProductSortOrder';
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

  getProducts({
    query,
    category,
    sortBy,
    order,
    limit = 9,
    skip = 0,
  }: IProductQueryParams): Observable<IProductResponce> {
    let url: string = '';

    const params: Record<string, string | number> = {
      limit,
      skip,
    };

    if (sortBy !== ProductSort.EMPTY) {
      params['sortBy'] = sortBy;
    }

    if (order !== ProductSortOrder.EMPTY) {
      params['order'] = order;
    }

    if (query) {
      url = '/search';
      params['q'] = query;
    } else if (category) {
      url = `/category/${ encodeURIComponent(category) }`;
    }

    return this.get<IProductResponce>(url, params);
  }
  
}
