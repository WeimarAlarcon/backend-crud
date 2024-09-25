import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway({ cors: { origin: '*' } })
export class NotificacionGateway {

  @WebSocketServer()
  server: Server;
  
  // escucha mensaje del cliente
  @SubscribeMessage('sendMessage')
  handleMessage(@MessageBody() mensaje: string): void {
    this.enviarNotificacion(mensaje); // Emitir la notificación usando el método del Gateway
  }

  enviarNotificacion(mensaje: string): void {
    console.log('mensaje recibido y reenviar por websocket', mensaje);
    this.server.emit('notificacion', mensaje); // Emitir el mensaje a todos los clientes conectados
  }

  enviarNotificacionPersona(persona: any): void {
    // Emitir la nueva persona a todos los clientes conectados
    this.server.emit('nuevaPersona', persona);
  }
}
