import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway({ cors: true })
export class NotificacionGateway {
    @WebSocketServer()
    server: Server;

    // Método para enviar notificaciones push a todos los clientes conectados
    enviarNotificacion(mensaje: string) {
        this.server.emit('notificacion', mensaje); // Emitir un evento a todos los clientes conectados
    }
}
