import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { catchError, switchMap, throwError } from 'rxjs';
import { IRefreshResponse } from '../IAuth';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next:HttpHandlerFn) => {
  
  const authService: AuthService = inject(AuthService);
  const token: string | null = authService.accessToken;
  
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${ token }`,
      },
    })
  }
  
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const isAuthRequest = req.url.includes('/login') || req.url.includes('/refresh');
      
      if (error.status === 401 && !isAuthRequest) {
        return authService.refreshToken().pipe(
          switchMap((response: IRefreshResponse) => {
            const newReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${response.accessToken}`,
              },
            });
            return next(newReq);
          }),
          catchError((refreshError) => {
              return throwError(() => refreshError);
          })
        );
      }
      return throwError(() => error);
    })
  );
};
