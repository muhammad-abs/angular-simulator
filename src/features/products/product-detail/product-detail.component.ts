import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProductDetails } from '../interfaces/IProductDetails';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-detail',
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit{
  
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  cartService: CartService = inject(CartService);
  
  product: IProductDetails | null = null;
  
  ngOnInit(): void {
    this.product = this.route.snapshot.data['productDetails'];
  }
  
  addToCart(product: IProductDetails): void {
    this.cartService.addToCart(product);
  }
  
  backToProducts(): void {
    this.router.navigate(['/products']);
  }

  goToCart(): void {
    this.router.navigate(['/products/cart']);
  }
  
}
