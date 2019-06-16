import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MessageService {
  
  messages: string[] = [];

  onClick(){
    console.log("onclick");
  }

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}


