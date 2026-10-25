import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../../interfaces/IUser';
import { UpperCasePipe } from '@angular/common';
import { NumberPipe } from './../../../../shared/pipes/number.pipe';

@Component({
  selector: 'app-user-card',
  imports: [UpperCasePipe, NumberPipe],
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
