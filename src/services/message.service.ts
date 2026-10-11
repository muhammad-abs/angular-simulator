import { inject, Injectable } from '@angular/core';
import { Message } from '../enums/Message';
import { IMessage } from '../interfaces/IMessage';
import { BehaviorSubject, delay, filter, Observable, of } from 'rxjs';
import { APP_CONFIG } from '../app/app-configuration.token';
import { IAppConfig } from '../app/IAppConfig';

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  private messageSubject: BehaviorSubject<IMessage[]> = new BehaviorSubject<IMessage[]>([]);
  message$: Observable<IMessage[]> = this.messageSubject.asObservable();

  private config: IAppConfig = inject(APP_CONFIG);

  private addMessage(type: Message, text: string): void {
    if (!this.config.enableNotifications) return;
    const message: IMessage = {
      id: Date.now(),
      type: type,
      text: text,
    };

    this.messageSubject.next([message, ...this.messageSubject.getValue()]);

    setTimeout(() => {
      this.closeMessage(message);
    }, 5000);
  }

  showWarn(message: string): void {
    this.addMessage(Message.WARN, message);
  }

  showError(message: string): void {
    this.addMessage(Message.ERROR, message);
  }

  showSuccess(message: string): void {
    this.addMessage(Message.SUCCESS, message);
  }

  showInfo(message: string): void {
    this.addMessage(Message.INFO, message);
  }

  closeMessage(messageToRemove: IMessage): void {
    this.messageSubject.next(
      this.messageSubject.getValue().filter((message: IMessage) => message !== messageToRemove),
    );
  }

}
