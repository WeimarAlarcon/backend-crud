import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway({ cors: { origin: '*' } })
export class KafkaGateway {

  @WebSocketServer()
  server: Server;

  enviarNotificacionPersona(persona: any): void {
    // Emitir la nueva persona a todos los clientes conectados
    console.log(persona)
    this.server.emit('nuevaPersona', persona);
  }
}
