import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../../interfaces/IUser';
import { UpperCasePipe } from '@angular/common';
import { NumberPipe } from "../../pipes/number.pipe";
import { HoverDirective } from "../../directives/hover.directive";
import { GradientDirective } from "../../directives/gradient.directive";

@Component({
  selector: 'app-user-card',
  imports: [UpperCasePipe, NumberPipe, HoverDirective, GradientDirective],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  
  @Input({ required: true }) user!: IUser;
  @Output() deleteUser: EventEmitter<number> = new EventEmitter<number>();
  
  onDeleteUser(): void {
    this.deleteUser.emit(this.user.id);
  }
  
}
