import { Component, inject } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faTelegram,
  faVk,
  faPinterest,
  faSkype,
  IconDefinition,
} from '@fortawesome/free-brands-svg-icons';
import { APP_CONFIG } from '../../app/app-configuration.token';
import { IAppConfig } from '../../app/IAppConfig';

@Component({
  selector: 'app-footer',
  imports: [FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {

  messageService: MessageService = inject(MessageService);
  config: IAppConfig = inject(APP_CONFIG);

  socialNetworks: { icon: IconDefinition; url: string }[] = [
    { icon: faTelegram, url: '#' },
    { icon: faVk, url: '#' },
    { icon: faPinterest, url: '#' },
    { icon: faSkype, url: '#' },
  ];

  socialNetworks2: string[] = ['telegram', 'vk', 'pinterest', 'skype'];

  services: string[] = [
    'Прогулки в горы летом',
    'Зимние походы в горы',
    'Посещение храмов в горах',
    'Экстремальные виды туризма',
    'Походы в джунглях Амазонии',
    'Поездка в Африку',
  ];

  travelInfo: string[] = [
    'Как собрать в долгий поход?',
    'Жизненно важные предметы для похода',
    'Медицинская страховка, гарантии безопасности',
    'Если вы врач - загляните сюда',
  ];

}
