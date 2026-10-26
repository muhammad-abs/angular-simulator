import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProductDetails } from '../../interfaces/IProductDetails';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../../cart/services/cart.service';

@Component({
  selector: 'app-product-detail',
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit {
  
  private route: ActivatedRoute = inject(ActivatedRoute);
  productService: ProductService = inject(ProductService);
  cartService: CartService = inject(CartService);
  
  product: IProductDetails | null = null;
  
  ngOnInit(): void {
    this.product = this.route.snapshot.data['productDetails'];
  }
  
  backToProducts(): void {
    this.productService.backToProducts();
  }
  
  addToCart(product: IProductDetails): void {
    this.cartService.addToCart(product);
  }

  goToCart(): void {
    this.cartService.goToCart();
  }
  
}
