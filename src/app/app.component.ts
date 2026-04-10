import { Component, inject } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { MessageComponent } from "../message/message.component";
import { LoaderComponent } from "../loader/loader.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, MessageComponent, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  
  localStorageService: LocalStorageService = inject(LocalStorageService);
    
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

