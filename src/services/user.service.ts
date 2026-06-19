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

  private USERS_KEY: string = 'users';
  
  getUsers(): IUser[] {
    return this.usersSubject.getValue();
  }
  
  setUsers(users: IUser[]): void {
    this.usersSubject.next(users);
    this.localStorageService.setValue(this.USERS_KEY, users);
  }
  
  createUser(user: IUser): void {
    const updatedUsers: IUser[] = this.getUsers().concat(user);
    this.setUsers(updatedUsers);
  }
  
  deleteUser(id: number): void {
    const updatedUsers: IUser[] = this.getUsers().filter((currentUser: IUser) => currentUser.id !== id);
    this.setUsers(updatedUsers);
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