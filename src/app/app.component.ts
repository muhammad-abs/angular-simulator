import { Component, inject, ViewEncapsulation } from '@angular/core';
import { LocalStorageService } from './core/services/local-storage.service';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../app/layouts/components/header/header.component';
import { FooterComponent } from '../app/layouts/components/footer/footer.component';
import { MessageComponent } from './shared/ui/message/message.component';
import { LoaderComponent } from './shared/ui/loader/loader.component';
import { ButtonModule } from 'primeng/button';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    MessageComponent,
    LoaderComponent,
    ButtonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {

  localStorageService: LocalStorageService = inject(LocalStorageService);
  themeService: ThemeService = inject(ThemeService);

  constructor() {
    this.saveLastVisitDate();
    this.saveVisitCount();
  }

  private saveLastVisitDate(): void {
    const nowDate: string = new Date().toISOString();
    this.localStorageService.setValue<string>('last-visit', nowDate);
  }

  private saveVisitCount(): void {
    const visitCount: number = Number(this.localStorageService.getValue<number>('visit-count'));
    this.localStorageService.setValue<string>('visit-count', (visitCount + 1).toString());
  }

}
