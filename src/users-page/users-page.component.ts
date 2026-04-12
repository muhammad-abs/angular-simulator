import { Component, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { AsyncPipe } from '@angular/common';
import { IUser } from '../interfaces/IUser';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-users-page',
  imports: [AsyncPipe],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent {
  
  private userService: UserService = inject(UserService);
  
  users$: Observable<IUser[]> = this.userService.loadUsers()
    .pipe(
      tap((users: IUser[]) => this.userService.setUsers(users))
    );
    
}
