import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';

import { OnModuleInit, UseGuards } from '@nestjs/common';
import { Server } from 'socket.io';
import { WsAuthGuard } from 'src/auth/auth.guard';


@WebSocketGateway({
  cors: {
    origin: '*',
  },
})


export class ChatGateway implements OnModuleInit {
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('Socket connectyed');
    });
  }
  @UseGuards(WsAuthGuard)
  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() message: any) {
    console.log(message);
    this.server.emit('onMessage', {
      msg: 'New Message ',
      content: message,
    });
  }
}
