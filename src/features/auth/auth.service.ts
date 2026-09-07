import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap, throwError } from 'rxjs';
import { IAuthResponse, ILoginRequest, IRefreshResponse, IUser } from './IAuth';
import { LocalStorageService } from '../../services/local-storage.service';
import { AuthApiService } from './auth-api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  localStorageService: LocalStorageService = inject(LocalStorageService)
  authApiService: AuthApiService = inject(AuthApiService)
  
  private TOKEN_KEY: string = 'access_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  
  private currentUserSubject: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null);
  $currentUser: Observable<IUser | null> = this.currentUserSubject.asObservable();
  
  get accessToken(): string | null {
    return this.localStorageService.getValue<string>(this.TOKEN_KEY);
  }
  
  get refreshTokenValue(): string | null { 
   return this.localStorageService.getValue<string>(this.REFRESH_TOKEN_KEY);
  }
  
  get isAuthenticated(): boolean {
    return !!this.accessToken;
  }
  
  login(loginAndPassword: ILoginRequest): Observable<IAuthResponse> {
    return this.authApiService.getTokens(loginAndPassword).pipe(
      tap((response: IAuthResponse) => {
        this.saveTokens(response.accessToken, response.refreshToken);
        this.currentUserSubject.next(response);
      })
    );
  }
  
  getMe(): Observable<IUser> {
    return this.authApiService.getMe().pipe(
      tap((user: IUser) => {
        this.currentUserSubject.next(user);
      }),
      catchError((error) => {
        this.logout();
        return throwError(() => error);
      })
    )
  }
  
  refreshToken(): Observable<IRefreshResponse> {
    const currentRefreshToken: string | null = this.refreshTokenValue;

    if (!currentRefreshToken) {
      this.logout();
      return throwError(() => new Error('No refresh token available'));
    }

    return this.authApiService.refreshToken(currentRefreshToken).pipe(
      tap((response: IRefreshResponse) => {
        this.saveTokens(response.accessToken, response.refreshToken);
      }),
      catchError((err) => {
        this.logout();
        return throwError(() => err);
      })
    );
  }
  
  public initializeApp(): Observable<IUser | null> {
    const token: string | null = this.accessToken;

    if (!token) {
      return of(null);
    }

    return this.getMe().pipe(
      catchError(() => {
        this.logout();
        return of(null);
      })
    );
  }
  
  logout(): void {
    this.localStorageService.removeValue(this.TOKEN_KEY);
    this.localStorageService.removeValue(this.REFRESH_TOKEN_KEY);
    this.currentUserSubject.next(null);
  }
  
  private saveTokens(accessToken: string, refreshToken: string): void {
    this.localStorageService.setValue(this.TOKEN_KEY, accessToken);
    this.localStorageService.setValue(this.REFRESH_TOKEN_KEY, refreshToken);
  }
  
}
