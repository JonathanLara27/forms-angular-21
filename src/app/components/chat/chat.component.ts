import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../common/services/chat.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="chat-container">
      <h3>Mensajes en tiempo real ({{ chatService.totalMessages() }})</h3>
      
      <ul>
        @for (msg of chatService.messages(); track msg.id) {
          <li><strong>{{ msg.user }}:</strong> {{ msg.text }}</li>
        }
      </ul>

      <input [(ngModel)]="newMessage" (keyup.enter)="send()" placeholder="Escribe algo...">
      <button (click)="send()">Enviar</button>
    </div>
  `
})
export class ChatComponent {
  chatService = inject(ChatService);
  newMessage = '';

  send() {
    if (this.newMessage.trim()) {
      this.chatService.sendMessage(this.newMessage);
      this.newMessage = '';
    }
  }
}