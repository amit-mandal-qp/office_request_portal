import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RequestRecord, Status } from '@office/shared';

@WebSocketGateway({ cors: { origin: '*' } })
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  afterInit(_server: Server): void {}

  handleConnection(_client: Socket): void {}

  handleDisconnect(_client: Socket): void {}

  @SubscribeMessage('join:fulfillment')
  handleJoinFulfillment(client: Socket): void {
    client.join('fulfillment');
  }

  emitRequestNew(request: RequestRecord): void {
    this.server.emit('request:new', { request });
  }

  emitRequestUpdated(id: string, status: Status): void {
    this.server.emit('request:updated', { id, status });
  }
}
