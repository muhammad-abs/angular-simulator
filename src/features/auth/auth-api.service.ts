import { inject, Injectable } from '@angular/core';
import { IAuthResponse, ILoginRequest, IRefreshResponse, IUser } from './IAuth';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  
  private http: HttpClient = inject(HttpClient);
  private API_URL: string = 'https://dummyjson.com/auth/';

  getTokens(loginAndPassword: ILoginRequest): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(`${ this.API_URL }/login`, loginAndPassword);
  }
  
  getCurrentProfile(): Observable<IUser> {
    return this.http.get<IUser>(`${ this.API_URL }/me`);
  }
  
  refreshToken(refreshToken: string): Observable<IRefreshResponse> {
    return this.http.post<IRefreshResponse>(`${ this.API_URL }/refresh`, {
      refreshToken: refreshToken,
      expiresInMins: 30
    });
  }
  
}
