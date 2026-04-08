import { Component, inject } from '@angular/core';
import { MessageService } from '../message.service';
import { INavItem } from '../interfaces/INavItems';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  
  readonly companyName: string = 'румтибет';
  messageService: MessageService = inject(MessageService);
  
  navItems: INavItem[] = [
    {
      id: 1,
      lable: 'Главная',
      path: '/',
      exact: true
    },
    {
      id: 2,
      lable: 'Пользователи',
      path: '/users',
      exact: false
    }
  ]
}
