import { Component } from '@angular/core';
import { Color } from '../enums/Color';
import './collection';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  
  companyName: string = 'румтибет';
  
  constructor() {
    this.saveLastVisitDate();
    this.saveVisitCount();
  }
  
  isMainColor(color: Color): boolean {
    const mainColors: Color[] = [
      Color.RED,
      Color.GREEN,
      Color.BLUE
    ];
    return mainColors.includes(color);
  }
  
  saveLastVisitDate(): void {
    const now: string = new Date().toISOString();
    localStorage.setItem('last-enter', now); 
  }
  
  saveVisitCount(): void {
    const visitCount: number = Number(localStorage.getItem('visit-count'));
    localStorage.setItem('visit-count', (visitCount + 1).toString());
  }
  
}

