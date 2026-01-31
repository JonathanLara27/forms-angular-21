import { Injectable, signal, computed } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { ChatMessage } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: Socket;

  // Signal privado para manejar el estado de los mensajes
  private _messages = signal<any[]>([]);

  // Signal público de solo lectura para los componentes
  public messages = this._messages.asReadonly();

  // Ejemplo de un Computed: contar mensajes
  public totalMessages = computed(() => this._messages().length);

  constructor() {
    this.socket = io('http://localhost:3000'); // URL de tu NestJS

    // 1. Escuchar la carga inicial
    this.socket.on('initialMessages', (messages: ChatMessage[]) => {
      this._messages.set(messages); // Reemplazamos el array vacío con los 5 últimos
    });

    // 2. Escuchar mensajes nuevos (como ya lo tenías)
    this.socket.on('messageCreated', (newMessage: ChatMessage) => {
      this._messages.update(prev => [...prev, newMessage]);
    });
  }

  sendMessage(text: string) {
    // Emitimos al Gateway de NestJS
    this.socket.emit('createChat', { text, user: 'Usuario Angular' });
  }
}