import { Component } from '@angular/core';
import { DifferentColors } from '../enums/Color';
import './Collection';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  companyName: string = 'РУМТИБЕТ';
  
  constructor() {
    this.saveUserVisitDate();
    this.saveUserVisitCount();
  }
  
  checkMainColors(color: DifferentColors): boolean {
    const mainColors = [
      DifferentColors.RED,
      DifferentColors.GREEN,
      DifferentColors.BLUE
    ];
    return mainColors.includes(color);
  }
  
  saveUserVisitDate(): void {
    const now: string = new Date().toISOString();
    localStorage.setItem('lastUserEnter', now); 
  }
  
  saveUserVisitCount(): void {
    const visitCount: number = Number(localStorage.getItem('visitCount'));
    localStorage.setItem('visitCount', (visitCount + 1).toString());
  }
  
}

