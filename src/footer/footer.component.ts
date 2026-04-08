import { Component, inject } from '@angular/core';
import { ISocialNetwork } from '../interfaces/ISocialNetwork';
import { IService } from '../interfaces/IService';
import { ITravelInfo } from '../interfaces/ITravelInfo';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  
  messageService: MessageService = inject(MessageService);

  socialNetworks: ISocialNetwork[] = [
    {
      id: 1,
      img: 'telegram-icon'
    },
    {
      id: 2,
      img: 'vk-icon'
    },
    {
      id: 3,
      img: 'pinterest-icon'
    },
    {
      id: 4 ,
      img: 'skype-icon'
    },
  ];
  
  services: IService[] = [
    {
      id: 1,
      service: 'Прогулки в горы летом'
    },
    {
      id: 2,
      service: 'Зимние походы в горы'
    },
    {
      id: 3,
      service: 'Посещение храмов в горах'
    },
    {
      id: 4,
      service: 'Экстремальные виды туризма'
    },
    {
      id: 5,
      service: 'Походы в джунглях Амазонии'
    },
    {
      id: 6,
      service: 'Поездка в Африку'
    },
  ];
  
  travelInfo: ITravelInfo[] = [
    {
      id: 1,
      info: 'Как собрать в долгий поход?'
    },
    {
      id: 2,
      info: 'Жизненно важные предметы для похода'
    },
    {
      id: 3,
      info: 'Медицинская страховка, гарантии безопасности'
    },
    {
      id: 4,
      info: 'Если вы врач - загляните сюда'
    }
  ];

}
