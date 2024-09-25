import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api'); 
  app.enableCors();

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'], // URL de tu servidor Kafka
      },
      consumer: {
        groupId: 'notificaciones-registro', // Nombre del grupo de consumidores
      },
    }
  })

  await app.startAllMicroservices(); // Iniciar microservicios

  await app.listen(process.env.APP_PORT);
}
bootstrap();
