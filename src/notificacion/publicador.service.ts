import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class PublicadorService {
  private client: ClientProxy;

  constructor() {
    // Configuración de RabbitMQ
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@localhost:5672'], // URL de RabbitMQ
        queue: 'notificaciones', // Nombre de la cola
        queueOptions: {
          durable: false,
        },
      },
    });
  }

  // Publicar un mensaje en RabbitMQ
  async enviarMensaje(mensaje: string) {
    console.log('mensaje en Entrega para RabbitMQ:', mensaje);
    return this.client.emit('notificacion', { mensaje }); // Publicar el mensaje en la cola
  }
}
