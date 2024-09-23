import { Body, Controller, Post } from '@nestjs/common';
import { NotificacionService } from './notificacion.service';
import { EventPattern } from '@nestjs/microservices';
import { PublicadorService } from './publicador.service';

@Controller('notificacion')
export class NotificacionController {
  constructor(
    private readonly notificacionService: NotificacionService,
    private readonly publicadorService: PublicadorService,
  ) {}

  // @EventPattern('notificacion')
  // async manejarNotificacion(data: Record<string, any>) {
  //   return this.notificacionService.enviarNotificacion(data.mensaje);
  // }

  @Post('enviar')
  async enviarNotificacion(@Body() body: { mensaje: string }) {
    console.log('Publicando mensaje en RabbitMQ:', body.mensaje);
    await this.publicadorService.enviarMensaje(body.mensaje);
    return { status: 'Mensaje publicado en RabbitMQ' };
  }
}
