import { Component, inject } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { MessageComponent } from "../message/message.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, MessageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  
  localStorageService: LocalStorageService = inject(LocalStorageService);
  
  isLoadingPage: boolean = true;
  
  constructor() {
    this.saveLastVisitDate();
    this.saveVisitCount();
    
    setTimeout(() => {
      this.isLoadingPage = false;
    }, 2000);
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

