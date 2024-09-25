import { Injectable } from '@nestjs/common';
import { NotificacionGateway } from './notificacion.gateway';
import { WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

// @Injectable()
export class NotificacionService {
  // constructor(private readonly notificacionGateway: NotificacionGateway) {}

  // @WebSocketServer()
  // server: Server;

  // enviarNotificacion(mensaje: string): void {
  //   this.notificacionGateway.server.emit('notificacion', { mensaje });
  // }

}
