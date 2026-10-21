import { Component, computed, inject, ResourceRef } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { SkeletonModule } from 'primeng/skeleton';
import { ProductSearchComponent } from '../product-search/product-search.component';
import { ProductSort } from '../enums/ProductSort';
import { ProductSortOrder } from '../enums/ProductSortOrder';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { IProduct } from '../interfaces/IProduct';
import { IProductCategories } from '../interfaces/IProductCategories';
import { Paginator } from 'primeng/paginator';

@Component({
  selector: 'app-products',
  imports: [SkeletonModule, Paginator, ProductSearchComponent, SelectModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  
  productService: ProductService = inject(ProductService);
  cartService: CartService = inject(CartService);
  
  sortOptions: { label: string, value: ProductSort }[] = [
    { label: 'Сортировка по..', value: ProductSort.EMPTY },
    { label: 'По названию', value: ProductSort.TITLE },
    { label: 'По цене', value: ProductSort.PRICE },
    { label: 'По рейтингу', value: ProductSort.RATING },
    { label: 'По наличию', value: ProductSort.STOCK },
  ];
  
  sortOrderOptions: { label: string, value: ProductSortOrder }[] = [
    { label: 'Направление..', value: ProductSortOrder.EMPTY },
    { label: 'По возрастанию', value: ProductSortOrder.ASC },
    { label: 'По убыванию', value: ProductSortOrder.DESC },
  ];
  
  categoryOptions = computed(() => [
    { name: 'Все категории', slug: '' },
    ...(this.categoriesResource.value() ?? []),
  ]);
  
  categoriesResource: ResourceRef<IProductCategories[] | undefined> = rxResource({
    stream: () => this.productService.getProductCategories(),
  });
  
  viewProduct(id: number): void {
    this.productService.viewProduct(id);
  }

  goToCart(): void {
    this.cartService.goToCart();
  }
  
  addToCart(product: IProduct): void {
    this.cartService.addToCart(product);
  }
  
}
