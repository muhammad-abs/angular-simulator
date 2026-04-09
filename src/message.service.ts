import { Injectable } from '@angular/core';
import { Message } from './enums/Message';
import { IMessage } from './interfaces/IMessage';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  
  messages: IMessage[] = [];
  
  private addMessage(type: Message, text: string): void {
    const message: IMessage = {
      id: Date.now(),
      type: type,
      text: text
    };
    
    this.messages = [message, ...this.messages];
    
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
    this.messages = this.messages.filter((message: IMessage) => message !== messageToRemove);
  }
  
}
