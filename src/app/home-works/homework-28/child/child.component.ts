import { ChangeDetectionStrategy, Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  imports: [],
  templateUrl: './child.component.html',
  styleUrl: './child.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent {
  
  @Input({ required: true }) userChild!: {
    name: string,
    age: number
  };
  
}
