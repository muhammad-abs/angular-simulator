import { Component, inject } from '@angular/core';
import { PluralPipe } from "../../pipes/plural.pipe";
import { UserService } from '../../services/user.service';
import { map, Observable} from 'rxjs';
import { AsyncPipe } from "@angular/common";

@Component({
  selector: 'app-users',
  imports: [PluralPipe, AsyncPipe],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  
  userService: UserService = inject(UserService);
    
  usersCount$: Observable<number> = this.userService.users$.pipe(
    map(users => users.length)
  );
  
}
