import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs';

export const httpLoggingInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  
  const startTime: number = Date.now();
  
  const method: string = req.method;
  const url: string = req.url;
  
  return next(req).pipe(
    tap({
      next: (event: HttpEvent<unknown>) => {
        if (event instanceof HttpResponse) { 
          const duration = Date.now() - startTime;
          console.log(
            `[HTTP SUCCESS]\n Метод: ${ method }\n URL: ${ url }\n Статус: ${ event.status }\n Время: ${ duration }ms`
          );
        }
      },
      error: (error: HttpErrorResponse) => {
        const duration = Date.now() - startTime;
        console.log(
          `[HTTP ERROR]\n Метод: ${ method }\n URL: ${ url }\n Статус: ${ error.status }\n Время: ${ duration }ms`
        );
      }
    })
  );
  
};
