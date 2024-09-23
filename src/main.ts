import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api'); 
  app.enableCors();

  // configurar microservicio con RabbitMQ

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://guest:guest@localhost:5672'], // URL de tu servidor RabbitMQ
      queue: 'notificaciones', // Nombre de la cola
      queueOptions: {
        durable: false // Configuración de durabilidad
      },
    },
  })

  await app.startAllMicroservices(); // Iniciar microservicios

  await app.listen(process.env.APP_PORT); // Iniciar el servidor HTTP
}
bootstrap();
