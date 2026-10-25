
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export abstract class BaseApiService {
  
  protected http: HttpClient = inject(HttpClient);

  protected apiUrl: string = 'https://dummyjson.com';

  abstract key: string;

  protected getUrl(url: string = ''): string {
    return `${ this.apiUrl }/${ this.key }${ url }`;
  }

  protected getParams(params?: object): string {
    if (!params) {
      return '';
    }

    return Object.entries(params)
      .filter(
        ([, value]) =>
          value !== undefined && value !== null && value !== '',
      )
      .map(
        ([key, value]) =>
          `${ encodeURIComponent(key) }=${ encodeURIComponent(String(value)) }`,
      )
      .join('&');
  }

  protected get<T>(
    url: string = '',
    queryParams?: object,
  ): Observable<T> {
    const requestUrl: string = this.getUrl(url);
    const params: string = this.getParams(queryParams);

    if (params) {
      return this.http.get<T>(`${ requestUrl }?${ params }`);
    }

    return this.http.get<T>(requestUrl);
  }
  
}
