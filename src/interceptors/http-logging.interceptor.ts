import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';

export const httpLoggingInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  
  const startTime: number = Date.now();
  const method: string = req.method;
  const url: string = req.url;
  
  const logMessage = (title: string, status: number): void => {
    const duration: number = Date.now() - startTime;
    console.log(`${ title }\n Метод: ${ method }\n URL: ${ url }\n Статус: ${ status }\n Время: ${ duration }ms`)
  }
  
  return next(req).pipe(
    tap((event: HttpEvent<unknown>) => {
      if (event instanceof HttpResponse) {
        logMessage('[HTTP SUCCESS]', event.status)
      }
    }),
    catchError ((error: HttpErrorResponse) => {
      logMessage('[HTTP ERROR]', error.status)
      return throwError(() => error);
    })
  );
  
};
