import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/IUser';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  
  private http: HttpClient = inject(HttpClient);
  private url: string = "https://jsonplaceholder.typicode.com/users";
  
  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.url);
  }
  
}
