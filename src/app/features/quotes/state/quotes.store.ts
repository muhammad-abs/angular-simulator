import { HttpErrorResponse } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState, } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, EMPTY, pipe, switchMap, tap } from 'rxjs';
import { QuotesFilter } from '../enums/QuotesFilter';
import { IQuote } from '../interfaces/IQuote';
import { IQuoteState } from '../interfaces/IQuoteState';
import { IQuotesResponse } from '../interfaces/IQuotesResponse';
import { QuotesApiService } from '../services/quotes-api.service';
import { withLoading } from './withLoading';

export const initialQuoteState: IQuoteState = {
  quotes: [],
  favorites: [],
  filter: QuotesFilter.ALL,
  randomQuote: null,
};

export const QuotesStore = signalStore(
  { providedIn: 'root' },

  withState(initialQuoteState),

  withLoading(),

  withComputed(({ quotes, favorites, filter }) => ({
    favoritesCount: computed(() => favorites().length),

    authorsCount: computed(
      () => new Set(quotes().map((quote: IQuote) => quote.author)).size,
    ),

    favoriteIds: computed(() => favorites().map((quote: IQuote) => quote.id)),

    filteredQuotes: computed(() => {
      if (filter() === QuotesFilter.FAVORITES) {
        return quotes().filter((quote: IQuote) =>
          favorites().some((favorite: IQuote) => favorite.id === quote.id),
        );
      }

      return quotes();
    }),
  })),

  withMethods((store, quotesApiService: QuotesApiService = inject(QuotesApiService)) => ({
    loadQuotes: rxMethod<void>(
      pipe(
        tap(() => {
          store.setLoading(true);
          store.setError(null);
        }),
        switchMap(() =>
          quotesApiService.getQuotes().pipe(
            tap((response: IQuotesResponse) =>
              patchState(store, { quotes: response.quotes }),
            ),
            tap(() => store.setLoading(false)),
            catchError((error: HttpErrorResponse) => {
              store.setLoading(false);
              store.setError(error.message);
              return EMPTY;
            }),
          ),
        ),
      ),
    ),

    toggleFavorite(quote: IQuote): void {
      const isFavorite: boolean = store
        .favorites()
        .some((favorite: IQuote) => favorite.id === quote.id);

      if (isFavorite) {
        patchState(store, (state) => ({
          favorites: state.favorites.filter(
            (favorite: IQuote) => favorite.id !== quote.id,
          ),
        }));
      } else {
        patchState(store, (state) => ({
          favorites: [...state.favorites, quote],
        }));
      }
    },

    setFilter(filter: QuotesFilter): void {
      patchState(store, { filter });
    },

    selectRandomQuote(): void {
      const quotes: IQuote[] = store.quotes();

      if (!quotes.length) {
        return;
      }

      const randomIndex: number = Math.floor(Math.random() * quotes.length);

      patchState(store, { randomQuote: quotes[randomIndex] });
    },
  })),
);