import { Injectable } from '@angular/core';
import { BaseApiService } from '../../../core/services/base-api.service';
import { Observable } from 'rxjs';
import { IQuotesResponse } from '../interfaces/IQuotesResponse';

@Injectable({
  providedIn: 'root',
})
export class QuotesApiService extends BaseApiService {
  
  override key: string = 'quotes';

  getQuotes(): Observable<IQuotesResponse> {
    return this.get<IQuotesResponse>();
  }
  
}
