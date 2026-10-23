
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

  getProducts(params: IProductQueryParams): Observable<IProductResponce> {
    let url: string = '';

    const queryParams: Record<string, string | number> = {
      limit: params.limit ?? 9,
      skip: params.skip ?? 0,
    };

    if (params.sortBy && params.sortBy !== ProductSort.EMPTY) {
      queryParams['sortBy'] = params.sortBy;
    }

    if (params.order && params.order !== ProductSortOrder.EMPTY) {
      queryParams['order'] = params.order;
    }

    if (params.query) {
      url = '/search';
      queryParams['q'] = params.query;
    } else if (params.category) {
      url = `/category/${ encodeURIComponent(params.category) }`;
    }

    return this.get<IProductResponce>(url, queryParams);
  }

}
