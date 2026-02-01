import { Component } from '@angular/core';
import { Color } from '../enums/Color';
import './collection';
import { IAdvantages } from '../interfaces/IAdvantages';
import { IProgramCards } from '../interfaces/IProgramCards';
import { FormsModule } from '@angular/forms';
import { ISearchProgram } from '../interfaces/ISearchProgram';
import { ILocation } from '../interfaces/ILocations';
import { ICountPeople } from '../interfaces/ICountPeople';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  
  isLoadingPage: boolean = true;
  
  inputValue: string = '';
  
  isTask: boolean = true;
  
  numberValue: number = 0;
  
  timeValue: string = '';
  
  isDateFocused: boolean = false;
  
  locations: ILocation[] = [
    { id: 1, value: 'Турция' },
    { id: 2, value: 'Италия' },
    { id: 3, value: 'Греция' }
  ];
  
  countPeople: ICountPeople[] = [ 
    { id: 1, count: 4 },
    { id: 2, count: 8 },
    { id: 3, count: 12},
    { id: 4, count: 16}
  ];
  
  searchProgram: ISearchProgram = {
    location: '',
    dateRange: '',
    countPeople: ''
  }
  
  isFormTuched: boolean = false;
  
  readonly companyName: string = 'румтибет';

  selectedAdvantageId!: number;
  
  advantages: IAdvantages[] = [
    {
      id: 1,
      title: 'Опытный гид',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      icon: 'exp-guide-icon.svg'
    },
    {
      id: 2,
      title: 'Безопасный поход',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      icon: 'safe-hiking-icon.svg'
    },
    {
      id: 3,
      title: 'Лояльные цены',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      icon: 'loyal-prices-icon.svg'
    },
  ];
  
  selectedProgramCardId!: number;
  
  programCards: IProgramCards[] = [
    { id: 1, image: 'mountains.png' },
    { id: 2, image: 'hiking.png' },
    { id: 3, image: 'snowmobile.png' },
    { id: 4, image: 'river.png' }
  ];
  
  constructor() {
    this.saveLastVisitDate();
    this.saveVisitCount();
    
    setInterval(() => {
    this.timeValue = new Date().toLocaleString('ru-RU');
    }, 1000); 
    
    setTimeout(() => {
      this.isLoadingPage = false;
    }, 2000);
  }
  
  changeTask(): void {
    this.isTask = !this.isTask;
  }
  
  increaseNumber(): void {
    this.numberValue +=1;
  }
  
  reduceNumber(): void {
    this.numberValue -=1;
  }
  
  tuchedForm(): void {
    this.isFormTuched = true;
  }
  
  isFormInvalid(): boolean {
    return !this.searchProgram.location || !this.searchProgram.dateRange || !this.searchProgram.countPeople;
  }
  
  selectAdvantage(advantageId: number): void {
    this.selectedAdvantageId = advantageId;
  }
  
  selectProgramCard(programCardId: number): void {
    this.selectedProgramCardId = programCardId;
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

