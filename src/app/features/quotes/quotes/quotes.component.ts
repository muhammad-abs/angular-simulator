import { Component, inject, OnInit } from '@angular/core';
import { QuotesStore } from '../state/quotes.store';
import { QuotesFilter } from '../enums/QuotesFilter';

@Component({
  selector: 'app-quotes',
  imports: [],
  templateUrl: './quotes.component.html',
  styleUrl: './quotes.component.scss',
})
export class QuotesComponent implements OnInit {
  
  readonly quotesFilter: typeof QuotesFilter = QuotesFilter;
  readonly quotesStore = inject(QuotesStore);

  ngOnInit(): void {
    this.quotesStore.loadQuotes();
  }
  
}
