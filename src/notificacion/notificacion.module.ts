import { Module } from '@nestjs/common';
import { NotificacionService } from './notificacion.service';
import { NotificacionController } from './notificacion.controller';
import { NotificacionGateway } from './notificacion.gateway';
import { PublicadorService } from './publicador.service';

@Module({
  controllers: [NotificacionController],
  providers: [NotificacionService, NotificacionGateway, PublicadorService],
})
export class NotificacionModule {}
