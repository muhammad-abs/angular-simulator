import { Component, DestroyRef, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs';

@Component({
  selector: 'app-users-filter',
  imports: [ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss',
})
export class UsersFilterComponent implements OnInit {

  @Output() filter: EventEmitter<string> = new EventEmitter<string>();

  filterFormControl: FormControl<string | null> = new FormControl<string>('');
  private destroyRef: DestroyRef = inject(DestroyRef);

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