import { Body, Controller, Post } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { NotificacionGateway } from 'src/notificacion/notificacion.gateway';

@Controller('kafka')
export class KafkaController {
  
  constructor(
    private readonly kafkaService: KafkaService,
    private readonly notificacionGateway: NotificacionGateway, // Inyección del Gateway
  ) {}

  @WebSocketServer()
  server: Server;

  @MessagePattern('hero.kill.dragon')
  killDragon(@Payload() message: any): any {
    console.log(`Recibió el mensaje:`, message);
    this.notificacionGateway.enviarNotificacion(message);
    const { heroId, dragonId } = message;
    console.log(`heroId: ${heroId} dragonId: ${dragonId}`);
    return { heroId, dragonId };
  }

  @Post('kill-dragon')
  async killDragonPost(@Body() body: { heroId: string; dragonId: string }): Promise<any> {
    const { heroId, dragonId } = body;

    // Enviar mensaje a Kafka
    const result = await this.kafkaService.killDragon(heroId, dragonId);

    // Emitir notificación a través de WebSocket
    this.notificacionGateway.enviarNotificacion(heroId);
    return result;
  }
}
