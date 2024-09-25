import { Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { KafkaController } from './kafka.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NotificacionModule } from 'src/notificacion/notificacion.module';
import { KafkaGateway } from './kafka.gateway';

@Module({
  controllers: [KafkaController],
  providers: [KafkaService, KafkaGateway],
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'], // Kafka corriendo en tu Docker,
          },
          consumer: {
            groupId: 'notificaciones-registro', // Nombre del grupo de consumidores
          },
        },
      },
    ]),
    NotificacionModule
  ],
  exports: [KafkaService, KafkaGateway]
})
export class KafkaModule {}
