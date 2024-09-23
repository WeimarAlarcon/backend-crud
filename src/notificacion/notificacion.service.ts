import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, EventPattern, MessagePattern, Transport } from '@nestjs/microservices';
import { NotificacionGateway } from './notificacion.gateway';

@Injectable()
export class NotificacionService {
    // private client: ClientProxy;

    // constructor() {
    //     this.client = ClientProxyFactory.create({
    //         transport: Transport.RMQ,
    //         options: {
    //             urls: ['amqp://guest:guest@localhost:5672'], // URL de tu servidor RabbitMQ
    //             queue: 'notificaciones', // Nombre de la cola
    //             queueOptions: {
    //                 durable: false
    //             }
    //         }
    //     });
    // }
    // async enviarNotificacion(mensaje: string) {
    //     return this.client.emit('notificacion', mensaje); // Emitir un evento a la cola
    // }

    constructor(private readonly notificacionGateway: NotificacionGateway) {}

    // Escuchar eventos de RabbitMQ
    @MessagePattern('notificacion')
    async enviarNotificacion(data: { mensaje: string }) {
        console.log('Recibido mensaje de RabbitMQ:', data.mensaje);
        const mensaje = data.mensaje;
        this.notificacionGateway.enviarNotificacion(mensaje);
    }
}
