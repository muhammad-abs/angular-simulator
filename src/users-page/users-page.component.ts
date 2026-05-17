import { Component, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { AsyncPipe } from '@angular/common';
import { IUser } from '../interfaces/IUser';
import { combineLatest, map, Observable, pipe } from 'rxjs';
import { UserCardComponent } from "../user-card/user-card.component";
import { CreateUserComponent } from '../create-user/create-user.component';
import { UsersFilterComponent } from '../users-filter/users-filter.component';


@Component({
  selector: 'app-users-page',
  imports: [AsyncPipe, UserCardComponent, CreateUserComponent, UsersFilterComponent],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent {
  
  private userService: UserService = inject(UserService);
  
  users$: Observable<IUser[]> = this.userService.users$;
  search$: Observable<string> = this.userService.search$;

  ngOnInit(): void {
    this.userService.loadUsers().pipe(
      map((users: IUser[]) => {
        this.userService.setUsers(users);
      })
    ).subscribe();
  }
  
  handleDeleteUser($event: number): void {
    this.userService.handleDeleteUser($event);
  }
  
  handleCreateUser(user: IUser): void {
    this.userService.handleCreateUser(user);
  }
  
  onSearchChanged(search: string): void {
    this.userService.onSearchChanged(search);
  }
  
  filteredUsers$: Observable<IUser[]> = combineLatest([this.users$,this.search$]).pipe(
    map(([users, search]: [IUser[], string]) => {
      const normalizedSearch: string = search.toLowerCase().trim();
      return users.filter((user: IUser) => user.name.toLowerCase().trim().includes(normalizedSearch));
    })
  );
  
}