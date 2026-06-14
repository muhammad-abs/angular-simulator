import { Component, inject, ViewEncapsulation } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { MessageComponent } from "../message/message.component";
import { LoaderComponent } from "../loader/loader.component";
import { ButtonModule } from 'primeng/button';
import { ThemeService } from '../services/theme.service';
import { Observable } from 'rxjs';
import { Theme } from '../enums/Theme';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    MessageComponent,
    LoaderComponent,
    ButtonModule,
    AsyncPipe
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  
  localStorageService: LocalStorageService = inject(LocalStorageService);
  themeService: ThemeService = inject(ThemeService);
  
  theme$: Observable<Theme> = this.themeService.theme$;
    
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

