import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { catchError, switchMap, throwError } from 'rxjs';
import { IRefreshResponse } from '../IAuth';
import { TokenType } from '../../../enums/TokenType';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next:HttpHandlerFn) => {
  
  const authService: AuthService = inject(AuthService);
  const token: string | null = authService.getToken(TokenType.ACCESS);
  
  const addTokenHeader = (request: HttpRequest<unknown>, bearerToken: string): HttpRequest<unknown> => {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
  };
  
  if (token) {
    req = addTokenHeader(req, token);
  }
  
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const isAuthRequest = req.url.includes('/login') || req.url.includes('/refresh');
      
      if (error.status === 401 && !isAuthRequest) {
        return authService.refreshToken().pipe(
          switchMap((response: IRefreshResponse) => {
            const newReq = addTokenHeader(req, response.accessToken);
            return next(newReq);
          }),
          catchError((refreshError: HttpErrorResponse) => {
              return throwError(() => refreshError);
          })
        );
      }
      return throwError(() => error);
    })
  );
};
