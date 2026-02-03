import { Component } from '@angular/core';
import { Color } from '../enums/Color';
import './collection';
import { IAdvantage } from '../interfaces/IAdvantage';
import { IProgramCard } from '../interfaces/IProgramCard';
import { FormsModule } from '@angular/forms';
import { IProgram } from '../interfaces/IProgram';
import { ILocation } from '../interfaces/ILocation';
import { IPeopleCount } from '../interfaces/IPeopleCount';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  
  isLoadingPage: boolean = true;
  enteredText: string = '';
  isTimerView: boolean = true;
  counter: number = 0;
  currentDateTime: Date = new Date();
  isDateFocused: boolean = false;
  isFormTouched: boolean = false;
  readonly companyName: string = 'румтибет';
  currentAdvantageId!: number;
  currentProgramCardId!: number;
  
  locations: ILocation[] = [
    { id: 1, value: 'Турция' },
    { id: 2, value: 'Италия' },
    { id: 3, value: 'Греция' }
  ];
  
  peopleCount: IPeopleCount[] = [ 
    { id: 1, count: 4 },
    { id: 2, count: 8 },
    { id: 3, count: 12 },
    { id: 4, count: 16 }
  ];
  
  programs: IProgram = {
    location: '',
    dateRange: '',
    peopleCount: ''
  }
  
  advantages: IAdvantage[] = [
    {
      id: 1,
      title: 'Опытный гид',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      icon: 'exp-guide-icon'
    },
    {
      id: 2,
      title: 'Безопасный поход',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      icon: 'safe-hiking-icon'
    },
    {
      id: 3,
      title: 'Лояльные цены',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      icon: 'loyal-prices-icon'
    },
  ];
    
  programCards: IProgramCard[] = [
    { id: 1, image: 'mountains' },
    { id: 2, image: 'hiking' },
    { id: 3, image: 'snowmobile' },
    { id: 4, image: 'river' }
  ];
  
  constructor() {
    this.saveLastVisitDate();
    this.saveVisitCount();
    
    setInterval(() => {
      this.currentDateTime = new Date();
    }, 1000); 
    
    setTimeout(() => {
      this.isLoadingPage = false;
    }, 2000);
  }
  
  changeTask(): void {
    this.isTimerView = !this.isTimerView;
  }
  
  increaseNumber(): void {
    this.counter +=1;
  }
  
  reduceNumber(): void {
    this.counter -=1;
  }
  
  isFormInvalid(): boolean {
    return !this.programs.location || !this.programs.dateRange || !this.programs.peopleCount;
  }
  
  selectAdvantage(advantageId: number): void {
    this.currentAdvantageId = advantageId;
  }
  
  selectProgramCard(programCardId: number): void {
    this.currentProgramCardId = programCardId;
  }
  
  private isMainColor(color: Color): boolean {
    const mainColors: Color[] = [
      Color.RED,
      Color.GREEN,
      Color.BLUE
    ];
    return mainColors.includes(color);
  }

  private saveLastVisitDate(): void {
    const now: string = new Date().toISOString();
    localStorage.setItem('last-enter', now); 
  }
  
  private saveVisitCount(): void {
    const visitCount: number = Number(localStorage.getItem('visit-count'));
    localStorage.setItem('visit-count', (visitCount + 1).toString());
  }
  
}

