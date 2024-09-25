import { Module } from '@nestjs/common';
import { NotificacionService } from './notificacion.service';
import { NotificacionGateway } from './notificacion.gateway';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [],
  providers: [NotificacionService, NotificacionGateway],
  imports: [],
  exports: [NotificacionService, NotificacionGateway],
})
export class NotificacionModule {}
