import { Component, computed, inject, ResourceRef, Signal, signal, WritableSignal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { SkeletonModule } from 'primeng/skeleton';
import { PaginatorState, Paginator } from 'primeng/paginator';
import { ProductSearchComponent } from '../product-search/product-search.component';
import { ProductSorts } from '../enums/ProductSorts';
import { ProductSortOrder } from '../enums/ProductSortOrder';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { IProductResponce } from '../interfaces/IProductResponce';
import { IProduct } from '../interfaces/IProduct';
import { IProductCategories } from '../interfaces/IProductCategories';

@Component({
  selector: 'app-products',
  imports: [SkeletonModule, Paginator, ProductSearchComponent, SelectModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  
  private router: Router = inject(Router);
  productService: ProductService = inject(ProductService);
  cartService: CartService = inject(CartService);
  
  pageSize: WritableSignal<number> = signal(9);
  page: WritableSignal<number> = signal(0);
  searchQuery: WritableSignal<string> = signal('');
  sortBy: WritableSignal<ProductSorts> = signal(ProductSorts.EMPTY);
  order: WritableSignal<ProductSortOrder> = signal(ProductSortOrder.EMPTY);
  category: WritableSignal<string> = signal('');
  
  sortOptions = [
    { label: 'Сортировка по..', value: ProductSorts.EMPTY },
    { label: 'По названию', value: ProductSorts.TITLE },
    { label: 'По цене', value: ProductSorts.PRICE },
    { label: 'По рейтингу', value: ProductSorts.RATING },
    { label: 'По наличию', value: ProductSorts.STOCK },
  ];
  
  sortOrderOptions = [
    { label: 'Направление..', value: ProductSortOrder.EMPTY },
    { label: 'По возрастанию', value: ProductSortOrder.ASC },
    { label: 'По убыванию', value: ProductSortOrder.DESC },
  ];
  
  skip: Signal<number> = computed(() => this.page() * this.pageSize());
  currentPage: Signal<number> = computed(() => this.page() + 1);
  
  skeletonItems: Signal<unknown[]> = computed(() =>
    Array.from({ length: this.pageSize() }),
  );
  
  totalPages: Signal<number> = computed(() =>
    Math.ceil(this.displayedTotal() / this.pageSize()),
  );
  
  categoryOptions = computed(() => [
    { name: 'Все категории', slug: '' },
    ...(this.categoriesResource.value() ?? []),
  ]);
  
  filteredProducts: Signal<IProduct[]> = computed(() => {
    const products: IProduct[] = this.productsResource.value()?.products ?? [];
    const query: string = this.searchQuery().trim().toLowerCase();

    if (!query) {
      return products;
    }

    return products.filter(
      (product: IProduct) =>
        product.title.toLowerCase().includes(query)
    );
  });
  
  paginatedProducts: Signal<IProduct[]> = computed(() => {
    const products: IProduct[] = this.filteredProducts();

    if (!this.category()) {
      return products;
    }

    return products.slice(
      this.skip(),
      this.skip() + this.pageSize(),
    );
  });

  displayedTotal: Signal<number> = computed(() => {
    if (this.category()) {
      return this.filteredProducts().length;
    }

    return this.productsResource.value()?.total ?? 0;
  });
  
  productsResource: ResourceRef<IProductResponce | undefined> = rxResource({
    params: () => ({
      query: this.category() ? '' : this.searchQuery().trim(),
      category: this.category(),
      sortBy: this.sortBy(),
      order: this.order(),
      limit: this.category() ? 0 : this.pageSize(),
      skip: this.category() ? 0 : this.skip()
    }),
  
    stream: ({ params }) => {
      return this.productService.getProducts(
        params.query,
        params.category,
        params.sortBy,
        params.order,
        params.limit,
        params.skip,
      );
    },
  });
  
  categoriesResource: ResourceRef<IProductCategories[] | undefined> = rxResource({
    stream: () => this.productService.getProductCategories(),
  });
  
  onPageChange(event: PaginatorState): void {
    const newPageSize: number = event.rows ?? this.pageSize();
    const first: number = event.first ?? 0;

    this.pageSize.set(newPageSize);
    this.page.set(Math.floor(first / newPageSize));
  }

  onFilter(search: string): void {
    this.searchQuery.set(search);
    this.page.set(0);
  }

  onSortChange(value: ProductSorts): void {
    this.sortBy.set(value);
    this.page.set(0);
  }

  onOrderChange(value: ProductSortOrder): void {
    this.order.set(value);
    this.page.set(0);
  }

  onCategoryChange(category: string): void {
    this.category.set(category);
    this.page.set(0);
  }
  
  viewProduct(id: number): void {
    this.router.navigate(['/products', id]);
  }
  
  addToCart(product: IProduct): void {
    this.cartService.addToCart(product);
  }
  
  goToCart(): void {
    this.router.navigate(['/products/cart']);
  }
  
}
