import { Component, inject} from '@angular/core';
import { MessageService } from '../services/message.service';
import { INavItem } from '../interfaces/INavItem';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { ThemeService } from '../services/theme.service';
import { ToggleSwitchChangeEvent, ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { SelectButtonModule } from 'primeng/selectbutton';
import { faMoon, faSun, IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { Preset } from '../enums/Preset';
import { AsyncPipe, NgClass } from '@angular/common';
import { ITheme } from '../interfaces/ITheme';
 
@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    FormsModule,
    ToggleSwitchModule,
    SelectButtonModule,
    AsyncPipe,
    NgClass
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  
  messageService: MessageService = inject(MessageService);
  themeService: ThemeService = inject(ThemeService);
  
  preset$: Observable<Preset> = this.themeService.preset$;
  isDarkMode$: Observable<boolean> = this.themeService.isDarkMode$;
  
  presetOptions: ITheme[] = this.themeService.presetOptions;
  
  faMoon: IconDefinition = faMoon;
  faSun: IconDefinition = faSun;
  
  navItems: INavItem[] = [
    {
      id: 1,
      label: 'Главная',
      path: '/',
      exact: true
    },
    {
      id: 2,
      label: 'Пользователи',
      path: '/users',
      exact: false
    }
  ];
  
  readonly companyName: string = 'румтибет';
  
  handleToggleMode(event: ToggleSwitchChangeEvent): void {
    this.themeService.toggleMode(event.checked);
  }
  
  handleChangePreset(preset: Preset): void {
    this.themeService.changePreset(preset);
  }
  
}
