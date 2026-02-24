import { Injectable } from '@angular/core';
import { Message } from './enums/Message';
import { IMessage } from './interfaces/IMessage';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  
  messages: IMessage[] = [];
  
  addMessage(type: Message, text: string): void {
    const message: IMessage = {
      id: Date.now(),
      type: type,
      text: text
    };
    this.messages = [message, ...this.messages]
    
    setTimeout(() => {
      this.closeMessage(message);
    }, 5000);
  }
  
  closeMessage(messageToRemove: IMessage): void {
    this.messages = this.messages.filter((message: IMessage) => {return message !== messageToRemove});
  }
  
}
