import { computed, effect, EffectRef, inject, Injectable, ResourceRef, Signal, signal, WritableSignal } from '@angular/core';
import { ProductApiService } from './product-api.service';
import { Observable } from 'rxjs';
import { IProductDetails } from '../interfaces/IProductDetails';
import { IProductCategories } from '../interfaces/IProductCategories';
import { IProductResponce } from '../interfaces/IProductResponce';
import { ProductSort } from '../enums/ProductSort';
import { ProductSortOrder } from '../enums/ProductSortOrder';
import { Router } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { PaginatorState } from 'primeng/paginator';
import { IProductQueryParams } from '../interfaces/IProductQueryParams';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  
  private router: Router = inject(Router);
  productsApiService: ProductApiService = inject(ProductApiService);
  
  pageSize: WritableSignal<number> = signal(9);
  page: WritableSignal<number> = signal(0);
  searchQuery: WritableSignal<string> = signal('');
  sortBy: WritableSignal<ProductSort> = signal(ProductSort.EMPTY);
  order: WritableSignal<ProductSortOrder> = signal(ProductSortOrder.EMPTY);
  category: WritableSignal<string> = signal('');
  
  skip: Signal<number> = computed(() => this.page() * this.pageSize());
  currentPage: Signal<number> = computed(() => this.page() + 1);
  
  totalPages: Signal<number> = computed(() =>
    Math.ceil(this.productsResource.value()?.total ?? 0 / this.pageSize()),
  );
  
  productsResource: ResourceRef<IProductResponce | undefined> = rxResource({
    params: () => ({
      query: this.searchQuery().trim(),
      category: this.category(),
      sortBy: this.sortBy(),
      order: this.order(),
      limit: this.pageSize(),
      skip: this.skip(),
    }),

    stream: ({ params }) => {
      return this.getProducts({
        query: params.query,
        category: params.category,
        sortBy: params.sortBy,
        order: params.order,
        limit: params.limit,
        skip: params.skip,
      });
    },
  });
  
  onPageChange(event: PaginatorState): void {
    const newPageSize: number = event.rows ?? this.pageSize();
    const first: number = event.first ?? 0;

    this.pageSize.set(newPageSize);
    this.page.set(Math.floor(first / newPageSize));
  }

  onFilter(search: string): void {
    this.searchQuery.set(search);
  }

  onSortChange(value: ProductSort): void {
    this.sortBy.set(value);
  }

  onOrderChange(value: ProductSortOrder): void {
    this.order.set(value);
  }

  onCategoryChange(category: string): void {
    this.category.set(category);
  }
  
  resetPageEffect: EffectRef = effect(() => {
    this.searchQuery();
    this.sortBy();
    this.order();
    this.category();

    this.page.set(0);
  });
  
  getProductById(id: number | string): Observable<IProductDetails> {
    return this.productsApiService.getProductById(id);
  }
  
  getProductCategories(): Observable<IProductCategories[]> {
    return this.productsApiService.getProductCategories();
  }
  
  getProducts(params: IProductQueryParams): Observable<IProductResponce> {
    return this.productsApiService.getProducts(params);
  }

  backToProducts(): void {
    this.router.navigate(['/products']);
  }
  
  viewProduct(id: number): void {
    this.router.navigate(['/products', id]);
  }
  
}
