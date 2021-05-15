import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { Player } from './Player'
import { Game } from './Game'

@WebSocketGateway()
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {

  games: Object;

  constructor() {
    this.games = {};
  }

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('createGame')
  handleCreateGame(client: Socket, payload: string): void {
    const game = new Game(client.id);
    this.games[game.id] = game;
    this.server.emit("gameCreated", game.id);
  }

  @SubscribeMessage('joinGame')
  handleJoinGame(client: Socket, payload: any): void {
    const player = new Player(client.id, "Player #2");
    this.logger.log(payload);
    const game = this.games[payload.gameId]
    this.server.emit("gameJoined", game);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}