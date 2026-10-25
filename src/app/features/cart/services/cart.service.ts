import { computed, inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { ICartItem } from '../interfaces/ICartItem';
import { IProduct } from '../../products/interfaces/IProduct';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  
  private router: Router = inject(Router);
  
  readonly TAX_RATE: number = 0.1;
  productItems: WritableSignal<ICartItem[]> = signal<ICartItem[]>([]);
  
  itemsCount: Signal<number> = computed(() => this.productItems()
    .reduce((itemsСount, productItem) => itemsСount + productItem.quantity, 0)
  );
  
  subtotal: Signal<number> = computed(() => this.productItems()
    .reduce((priceSum, productItem) => priceSum + productItem.product.price * productItem.quantity, 0)
  );

  tax: Signal<number> = computed(() => this.subtotal() * this.TAX_RATE);
  total: Signal<number> = computed(() => this.subtotal() + this.tax());
  
  addToCart(product: IProduct): void {
    this.productItems.update((items: ICartItem[]) => {
      const existingItem: ICartItem | undefined = items.find(
        (item: ICartItem) => item.product.id === product.id,
      );

      if (existingItem) {
        return items.map((item: ICartItem) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...items, { product, quantity: 1 }];
    });
  }
  
  updateQuantity(productId: number, quantity: number): void {
    if (quantity < 1) {
      return;
    }

    this.productItems.update((items: ICartItem[]) =>
      items.map((item: ICartItem) =>
        item.product.id === productId
          ? { ...item, quantity }
          : item,
      ),
    );
  }

  removeFromCart(productId: number): void {
    this.productItems.update((items: ICartItem[]) =>
      items.filter((item: ICartItem) => item.product.id !== productId),
    );
  }
  
  clearCart(): void {
    this.productItems.set([]);
  }
  
  goToCart(): void {
    this.router.navigate(['/products/cart']);
  }
  
}
