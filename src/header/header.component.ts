import { Component, inject} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MessageService } from '../services/message.service';
import { INavItem } from '../interfaces/INavItem';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { ThemeService } from '../services/theme.service';
import { ThemeKey } from '../types/theme.types';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import { Theme } from '../enums/Theme';
import { Observable, tap } from 'rxjs';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    FormsModule,
    ToggleSwitchModule,
    SelectButtonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  
  readonly companyName: string = 'румтибет';
  protected messageService: MessageService = inject(MessageService);
  private themeService: ThemeService = inject(ThemeService);
  
  private primeTheme$: Observable<Theme> = this.themeService.primeTheme$;
  
  protected switched: boolean = false;
  protected currentPreset!: string;
  
  protected navItems: INavItem[] = [
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
  
  protected presetOptions = [
    { name: 'Nora', value: 'nora' },
    { name: 'Lara', value: 'lara' },
    { name: 'Aura', value: 'aura' }
  ];
  
  toggleTheme(theme: ThemeKey): void {
    this.themeService.toggleTheme(theme);
  }
  
  themeSubscription = this.primeTheme$.pipe(
    tap((primeTheme: Theme) => { 
      this.switched = (primeTheme === Theme.DARK);
    }),
    takeUntilDestroyed()
  ).subscribe();
  
  ngOnInit(): void {
    this.switched = this.themeService.getCurrentTheme('prime') === Theme.DARK;
    this.currentPreset = this.themeService.getCurrentPreset();
  }
  
  updatePreset(preset: string): void {
    this.themeService.updatePreset(preset);
  }
  
}
