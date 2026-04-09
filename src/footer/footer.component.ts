import { Component, inject } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  
  messageService: MessageService = inject(MessageService);

  socialNetworks: string[] = [
    'telegram',
    'vk',
    'pinterest',
    'skype'
  ];
  
  services: string[] = [
    "Прогулки в горы летом",
    "Зимние походы в горы",
    "Посещение храмов в горах",
    "Экстремальные виды туризма",
    "Походы в джунглях Амазонии",
    "Поездка в Африку"
  ];
  
  travelInfo: string[] = [
    "Как собрать в долгий поход?",
    "Жизненно важные предметы для похода",
    "Медицинская страховка, гарантии безопасности",
    "Если вы врач - загляните сюда"
  ];

}
