import { Component, inject } from '@angular/core';
import { Color } from '../enums/Color';
import { IAdvantage } from '../interfaces/IAdvantage';
import { IProgramCard } from '../interfaces/IProgramCard';
import { FormsModule } from '@angular/forms';
import { IProgram } from '../interfaces/IProgram';
import { ILocation } from '../interfaces/ILocation';
import { IPeopleCount } from '../interfaces/IPeopleCount';
import { IDestination } from '../interfaces/IDestination';
import { NgTemplateOutlet } from '@angular/common';
import { IArticle } from '../interfaces/IArticle';
import { MessageService } from '../message.service';
import { Message } from '../enums/Message';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-root',
  imports: [FormsModule, NgTemplateOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  
  messageService: MessageService = inject(MessageService);
  localStorageService: LocalStorageService = inject(LocalStorageService);
  
  isLoadingPage: boolean = true;
  enteredText!: string;
  isTimerView: boolean = true;
  counter: number = 0;
  currentDateTime: Date = new Date();
  isDateFocused: boolean = false;
  isFormTouched: boolean = false;
  readonly companyName: string = 'румтибет';
  currentAdvantageId!: number;
  currentProgramCardId!: number;
  selectedDestination?: IDestination;
  currentArticleId!: number;
  MessageTypes: typeof Message = Message;
  
  articles: IArticle[] = [
    {
      id: 1,
      img: 'italy',
      title: 'Красивая Италия, какая она в реальности?',
      desc: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      date: '01/04/2023'
    },
    {
      id: 2,
      img: 'world',
      title: 'Долой сомнения! Весь мир открыт для вас!',
      desc: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации ... независимые способы реализации соответствующих...',
      date: '01/06/2023'
    },
    {
      id: 3,
      img: 'solo',
      title: 'Как подготовиться к путешествию в одиночку? ',
      desc: 'Для современного мира базовый вектор развития предполагает.',
      date: '01/05/2023'
    },
    {
      id: 4,
      img: 'india',
      title: 'Индия ... летим?',
      desc: 'Для современного мира базовый.',
      date: '01/07/2023'
    },
  ]
  
  popularDestinations: IDestination[] = [
    { 
      id: 1, 
      image: 'lake',
      title: 'Озеро возле гор' ,
      subTitle: 'романтическое приключение',
      cost: 480,
      review:' 4.9',
      desc: 'Его корни уходят в один фрагмент классической латыни 45 года н.э., то есть более двух тысячелетий назад. Ричард МакКлинток, профессор латыни из колледжа Hampden-Sydney, штат Вирджиния, взял одно из самых странных слов в Lorem Ipsum, "consectetur"и занялся его поисками в классической латинской литературе.'
    },
    { 
      id: 2, 
      image: 'night',
      title: 'Ночь в горах' ,
      subTitle: 'в компании друзей',
      cost: 500,
      review: '4.5',
      desc: '2Его корни уходят в один фрагмент классической латыни 45 года н.э., то есть более двух тысячелетий назад. Ричард МакКлинток, профессор латыни из колледжа Hampden-Sydney, штат Вирджиния, взял одно из самых странных слов в Lorem Ipsum, "consectetur"и занялся его поисками в классической латинской литературе.'
    },
    { 
      id: 3, 
      image: 'workout',
      title: 'Растяжка в горах' ,
      subTitle: 'для тех, кто забоится о себе',
      cost: 230,
      review: '5.0',
      desc: '3Его корни уходят в один фрагмент классической латыни 45 года н.э., то есть более двух тысячелетий назад. Ричард МакКлинток, профессор латыни из колледжа Hampden-Sydney, штат Вирджиния, взял одно из самых странных слов в Lorem Ipsum, "consectetur"и занялся его поисками в классической латинской литературе.'
    },
  ]
  
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
  
  selectArticle(articleId: number): void {
    this.currentArticleId = articleId;
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
    const nowDate: string = new Date().toISOString();
    this.localStorageService.setValue('last-visit', nowDate);
  }
  
  private saveVisitCount(): void {
    const visitCount: number = Number(this.localStorageService.getValue('visit-count'));
    this.localStorageService.setValue('visit-count', (visitCount + 1).toString());
  }
}

