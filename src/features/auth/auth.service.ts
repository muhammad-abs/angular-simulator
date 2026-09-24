import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap, throwError } from 'rxjs';
import { IAuthResponse, IAuthTokens, ILoginRequest, IRefreshResponse, IUser } from './IAuth';
import { LocalStorageService } from '../../services/local-storage.service';
import { AuthApiService } from './auth-api.service';
import { TokenType } from '../../enums/TokenType';
import { Role } from '../../enums/Role';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  localStorageService: LocalStorageService = inject(LocalStorageService);
  authApiService: AuthApiService = inject(AuthApiService);

  private readonly TOKENS_KEY = 'auth_tokens' as const;

  private currentUserSubject: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(
    null,
  );

  $currentUser: Observable<IUser | null> = this.currentUserSubject.asObservable();

  get isAdmin(): boolean {
    return this.currentUserSubject.value?.role === Role.ADMIN;
  }

  get tokens(): IAuthTokens | null {
    return this.localStorageService.getValue<IAuthTokens>(this.TOKENS_KEY);
  }

  getToken(type: TokenType): string | null {
    return this.tokens?.[type as keyof IAuthTokens] ?? null;
  }

  get isAuthenticated(): boolean {
    return !!this.getToken(TokenType.ACCESS);
  }

  login(loginAndPassword: ILoginRequest): Observable<IAuthResponse> {
    return this.authApiService.getTokens(loginAndPassword).pipe(
      tap((response: IAuthResponse) => {
        this.saveTokens(response.accessToken, response.refreshToken);
        this.currentUserSubject.next(response);
      }),
    );
  }

  getCurrentProfile(): Observable<IUser> {
    return this.authApiService.getCurrentProfile().pipe(
      tap((user: IUser) => {
        this.currentUserSubject.next(user);
      }),
      catchError((error) => {
        this.logout();
        return throwError(() => error);
      }),
    );
  }

  refreshToken(): Observable<IRefreshResponse> {
    const currentRefreshToken: string | null = this.getToken(TokenType.REFRESH);

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
      }),
    );
  }

  initializeApp(): Observable<IUser | null> {
    const token: string | null = this.getToken(TokenType.ACCESS);

    if (!token) {
      return of(null);
    }

    return this.getCurrentProfile().pipe(
      catchError(() => {
        this.logout();
        return of(null);
      }),
    );
  }

  logout(): void {
    this.localStorageService.removeValue(this.TOKENS_KEY);
    this.currentUserSubject.next(null);
  }

  private saveTokens(accessToken: string, refreshToken: string): void {
    this.localStorageService.setValue(this.TOKENS_KEY, { accessToken, refreshToken });
  }

}
