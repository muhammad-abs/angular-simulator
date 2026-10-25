import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { ProductService } from './product.service';
import { inject } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { catchError, EMPTY } from 'rxjs';
import { IProductDetails } from './interfaces/IProductDetails';

export const productResolver: ResolveFn<IProductDetails> = (
  route: ActivatedRouteSnapshot, state
) => {
  const productService: ProductService = inject(ProductService);
  const messageService: MessageService = inject(MessageService);
  
  const id: string | null = route.paramMap.get('id')!;
  
  return productService.getProductById(id).pipe(
    catchError(() => {
      messageService.showError('Не удалось загрузить продукт');
      return EMPTY;
    })
  );
};
