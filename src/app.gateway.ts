import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WsException,
  WsResponse
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { Player } from './Player'
import { Game } from './Game'


@WebSocketGateway()
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() server: Server;
  private games: Map<String, Game>;
  private logger: Logger;

  constructor() {
    this.games = new Map();
    this.logger = new Logger('AppGateway');
  }


  @SubscribeMessage('createGame')
  handleCreateGame(client: Socket, payload: string): WsResponse<unknown> {
    const game = new Game(client.id);
    this.games.set(game.id, game);
    const event = 'gameCreated'
    return { event, data: game.id };
  }

  @SubscribeMessage('joinGame')
  handleJoinGame(socket: Socket, payload: any): WsResponse<unknown> {
    const player = new Player(socket.id, payload.name);
    const game = this.games.get(payload.gameId);

    if (!game) {
      throw new WsException('game_not_found');
    }

    game.addPlayer(player);
    socket.join(payload.gameId);

    const event = 'gameJoined';
    return { event, data: game };
  }

  @SubscribeMessage('joinTeam')
  handleJoinTeam(socket: Socket, payload: any): void {
    const game = this.games.get(payload.gameId);

    if (!game) {
      throw new WsException('game_not_found');
    }

    game.joinTeam(socket.id, payload.team);
    this.server.to(payload.gameId).emit('lobbyChanged', game);
  }

  handleDisconnect(client: Socket) {
    this.games.forEach((game) => {
      if (game.containsPlayer(client.id)) {
        game.removePlayer(client.id);
        this.server.to(game.id).emit('lobbyChanged', game);
      }
    });
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}