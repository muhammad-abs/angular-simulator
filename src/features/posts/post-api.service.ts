import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Интерфейсы
import { IPostResponse } from './IPostResponse';
import { IPost } from './IPost';

@Injectable({
  providedIn: 'root',
})
export class PostApiService {
  
  private http: HttpClient = inject(HttpClient);
  private url: string = 'https://dummyjson.com/posts';

  getPosts(limit: number = 10, skip: number = 0): Observable<IPostResponse> {
    const params: HttpParams = new HttpParams()
      .set('limit', limit.toString())
      .set('skip', skip.toString())
      .set('select', 'title,tags,views');

    return this.http.get<IPostResponse>(this.url, { params });
  }

  getPostById(id: number | string): Observable<IPost> {
    return this.http.get<IPost>(`${ this.url }/${ id }`);
  }

  createPost(post: Partial<IPost>): Observable<IPost> {
    return this.http.post<IPost>(`${ this.url }/add`, post);
  }

  updatePost(id: number | string, postData: Partial<IPost>): Observable<IPost> {
    return this.http.put<IPost>(`${ this.url }/${ id }`, postData);
  }

  deletePost(id: number | string): Observable<IPost> {
    return this.http.delete<IPost>(`${ this.url }/${ id }`);
  }
  
}