import { Injectable } from '@angular/core';
import { Message } from '../enums/Message';
import { IMessage } from '../interfaces/IMessage';
import { BehaviorSubject, delay, filter, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  
  private messageSubject: BehaviorSubject<IMessage[]> = new BehaviorSubject<IMessage[]>([]);
  message$: Observable<IMessage[]> = this.messageSubject.asObservable();
  
  private addMessage(type: Message, text: string): void {
    const message: IMessage = {
      id: Date.now(),
      type: type,
      text: text
    };

    this.messageSubject.next([message, ...this.messageSubject.getValue()]);
    
    of(message).pipe(
      delay(5000)
    ).subscribe((message: IMessage) => this.closeMessage(message));
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
      this.messageSubject.getValue()
      .filter((message: IMessage) => message !== messageToRemove));
  }
  
}
