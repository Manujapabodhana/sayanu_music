import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
    MessageBody,
    ConnectedSocket,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
    private logger: Logger = new Logger('ChatGateway');

    @SubscribeMessage('joinRoom')
    handleJoinRoom(@MessageBody() roomId: string, @ConnectedSocket() client: Socket): void {
        client.join(roomId);
        this.logger.log(`Client ${client.id} joined room: ${roomId}`);
    }

    @SubscribeMessage('sendMessage')
    handleMessage(
        @MessageBody() payload: { roomId: string, message: string, sender: string, timestamp: string },
        @ConnectedSocket() client: Socket,
    ): void {
        this.server.to(payload.roomId).emit('receiveMessage', payload);
        this.logger.log(`Message in room ${payload.roomId}: ${payload.message}`);
    }

    afterInit(server: Server) {
        this.logger.log('Init');
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`Client connected: ${client.id}`);
    }
}
