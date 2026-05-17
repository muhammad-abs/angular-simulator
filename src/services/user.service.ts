import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, delay, filter, finalize, Observable, of, tap } from 'rxjs';
import { IUser } from '../interfaces/IUser';
import { UserApiService } from './user-api.service';
import { LoaderService } from './loader.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from './message.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  private userApiService: UserApiService = inject(UserApiService);
  private loaderService: LoaderService = inject(LoaderService);
  private messageService: MessageService = inject(MessageService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  
  private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]> = this.usersSubject.asObservable();
  
  private searchSubject : BehaviorSubject<string> = new BehaviorSubject<string>('');
  search$: Observable<string> = this.searchSubject.asObservable();

  private USERS_KEY: string = 'users';
  
  setUsers(users: IUser[]): void {
    this.usersSubject.next(users);
  }
  
  handleCreateUser(user: IUser): void {
    this.updateUsers(this.getUsers().concat(user));
  }
  
  getUsers(): IUser[] {
    return this.usersSubject.getValue();
  }
  
  handleDeleteUser(id: number): void {
    this.updateUsers(this.getUsers().filter((currentUser: IUser) => currentUser.id !== id));
  }
  
  updateUsers(updatedUsers: IUser[]): void {
    this.setUsers(updatedUsers);
    this.localStorageService.setValue(this.USERS_KEY, updatedUsers);
  }
  
  onSearchChanged(search: string): void {
    this.searchSubject.next(search);
  }
  
  loadUsers(): Observable<IUser[]> {
    const savedUsers: IUser[] | null = this.localStorageService.getValue<IUser[]>(this.USERS_KEY);
    if (savedUsers) {
      return of(savedUsers);
    } else {
      this.loaderService.showLoader();
      return this.userApiService.getUsers()
        .pipe(
          finalize(() => this.loaderService.hideLoader()),
          catchError((error: HttpErrorResponse) => {
            this.messageService.showError('Пользователи не были загружены');
            return of([]);
          }),
        );
    }
  }
}