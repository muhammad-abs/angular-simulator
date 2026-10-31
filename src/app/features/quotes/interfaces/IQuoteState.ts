import { QuotesFilter } from '../enums/QuotesFilter';
import { IQuote } from './IQuote';

export interface IQuoteState {
  quotes: IQuote[];
  favorites: IQuote[];
  filter: QuotesFilter;
  randomQuote: IQuote | null;
}