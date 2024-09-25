import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { CreatePersonaDto } from './dto/create-persona.dto';

@WebSocketGateway({ cors: { origin: '*' } })
export class PersonaGateway {
  @WebSocketServer()
  server: Server;

  // escucha mensaje del cliente
//   @SubscribeMessage('enviarMensaje')
  mensajeRespuesta(@MessageBody() persona: CreatePersonaDto): void {
    console.log('persona recibida y reenviar por websocket', JSON.stringify(persona, null, 2));
    this.server.emit('personaNueva', persona);// Emitir la notificación usando el método del Gateway
  }
}
