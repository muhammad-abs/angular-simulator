import { Component, DestroyRef, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs';

@Component({
  selector: 'app-product-search',
  imports: [ReactiveFormsModule, InputTextModule],
  templateUrl: './product-search.component.html',
  styleUrl: './product-search.component.scss',
})
export class ProductSearchComponent implements OnInit {
  
  private destroyRef: DestroyRef = inject(DestroyRef);
  
  @Output() filter: EventEmitter<string> = new EventEmitter<string>();

  filterFormControl: FormControl<string | null> = new FormControl<string>('');
  
  ngOnInit(): void {
    this.filterFormControl.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((value: string | null) => value ?? ''),
      tap((value: string) => this.filter.emit(value)),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe();
  }
  
}
