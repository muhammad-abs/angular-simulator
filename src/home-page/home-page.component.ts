import { Component, inject } from '@angular/core';
import { MessageService } from '../services/message.service';
import { Message } from '../enums/Message';
import { FormsModule } from '@angular/forms';
import { IAdvantage } from '../interfaces/IAdvantage';
import { IProgram } from '../interfaces/IProgram';
import { ILocation } from '../interfaces/ILocation';
import { IPeopleCount } from '../interfaces/IPeopleCount';
import { IProgramCard } from '../interfaces/IProgramCard';
import { IDestination } from '../interfaces/IDestination';
import { IArticle } from '../interfaces/IArticle';
import { IPhoto } from '../interfaces/IPhoto';

@Component({
  selector: 'app-home-page',
  imports: [FormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  
  messageService: MessageService = inject(MessageService);
  
  isDateFocused: boolean = false;
  isFormTouched: boolean = false;
  enteredText!: string;
  messageType: typeof Message = Message;
  currentAdvantageId!: number;
  currentProgramCardId! : number;
  currentArticleId!: number;
  isTimerView: boolean = true;
  currentDateTime: Date = new Date();
  counter: number = 0;

  programs: IProgram = {
    location: '',
    dateRange: '',
    peopleCount: ''
  }
  
  peopleCount: IPeopleCount[] = [ 
    { id: 1, count: 4 },
    { id: 2, count: 8 },
    { id: 3, count: 12 },
    { id: 4, count: 16 }
  ];
  
  locations: ILocation[] = [
    { id: 1, value: 'Турция' },
    { id: 2, value: 'Италия' },
    { id: 3, value: 'Греция' }
  ];
  
  programCards: IProgramCard[] = [
    { id: 1, image: 'mountains' },
    { id: 2, image: 'hiking' },
    { id: 3, image: 'snowmobile' },
    { id: 4, image: 'river' }
  ];
    
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
  
  destinations: IDestination[] = [
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
  ];
  
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
  ];
  
  photos: IPhoto[] = [
    {
      id: 1,
      img: 'balloons'
    },
    {
      id: 2,
      img: 'trip-map'
    },
    {
      id: 3,
      img: 'hotel'
    },
    {
      id: 4,
      img: 'beach'
    },
    {
      id: 5,
      img: 'canyon'
    },
    {
      id: 6,
      img: 'diary'
    },
  ];
  
  constructor() {
    setInterval(() => {
      this.currentDateTime = new Date();
    }, 1000); 
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
  
  selectArticle(articleId: number): void {
    this.currentArticleId = articleId;
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
  
}
