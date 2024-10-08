import { Module } from '@nestjs/common';
import { PersonasService } from './personas.service';
import { PersonasController } from './personas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Persona } from './entities/persona.entity';
import { KafkaModule } from 'src/kafka/kafka.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NotificacionModule } from 'src/notificacion/notificacion.module';
import { PersonaGateway } from './persona.gateway';

@Module({
  controllers: [PersonasController],
  providers: [PersonasService, PersonaGateway],
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
    TypeOrmModule.forFeature([Persona]),
    KafkaModule, 
    NotificacionModule, // Inyección del Gateway
  ],
})
export class PersonasModule {}
