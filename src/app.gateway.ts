import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WsException,
  WsResponse,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { Player } from './game/Player';
import { Game } from './game/Game';
import { Coordinates } from './game/Coordinates';
import { Move } from './game/Move';

@WebSocketGateway()
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private games: Map<string, Game>;
  private players: Map<string, Player>;
  private logger: Logger;

  constructor() {
    this.games = new Map();
    this.players = new Map();
    this.logger = new Logger('AppGateway');
  }

  handleConnection(client: Socket, ...args: any[]) {
    const oldId = client.handshake.query.id as string;
    const name = client.handshake.query.name as string;

    let player = this.players.get(oldId);
    if (player) {
      player.id = client.id;
      this.players.delete(oldId);
    } else {
      player = new Player(client.id, name);
    }
    this.players.set(client.id, player);

    client.emit('clientConnected', client.id);
    this.logger.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('createGame')
  handleCreateGame(client: Socket, payload: string): WsResponse<unknown> {
    const player = this.players.get(client.id);

    if (!player) {
      throw new WsException('player_not_found');
    }
    const game = new Game(player);
    this.games.set(game.id, game);
    const event = 'gameCreated';
    return { event, data: game.id };
  }

  @SubscribeMessage('joinGame')
  handleJoinGame(socket: Socket, payload: any): WsResponse<unknown> {
    const player = this.players.get(socket.id);
    if (!player) {
      throw new WsException('player_not_found');
    }

    const game = this.games.get(payload.gameId);
    if (!game) {
      throw new WsException('game_not_found');
    }

    game.addPlayer(player);
    socket.join(payload.gameId);

    const event = 'gameStateChanged';
    return { event, data: game };
  }

  @SubscribeMessage('joinTeam')
  handleJoinTeam(socket: Socket, payload: any): void {
    const game = this.games.get(payload.gameId);

    if (!game) {
      throw new WsException('game_not_found');
    }

    game.joinTeam(socket.id, payload.team);
    this.server.to(payload.gameId).emit('gameStateChanged', game);
  }

  @SubscribeMessage('changeName')
  handleChangeName(socket: Socket, payload: any): void {
    const player = this.players.get(socket.id);
    if (!player) {
      throw new WsException('player_not_found');
    }

    player.name = payload.name;

    this.games.forEach((game) => {
      if (game.containsPlayer(socket.id)) {
        this.server.to(game.id).emit('gameStateChanged', game);
      }
    });
  }

  @SubscribeMessage('startGame')
  handleStartGame(socket: Socket, payload: any): void {
    const game = this.games.get(payload.gameId);
    if (!game) {
      throw new WsException('game_not_found');
    }

    if (game.admin.id !== socket.id) {
      throw new WsException('not_authorized_to_start_game');
    }
    game.startGame();
    this.server.to(payload.gameId).emit('gameStateChanged', game);
  }

  @SubscribeMessage('makeMove')
  handleMakeMove(socket: Socket, payload: any): void {
    const player = this.players.get(socket.id);
    if (!player) {
      throw new WsException('player_not_found');
    }

    const game = this.games.get(payload.gameId);
    if (!game) {
      throw new WsException('game_not_found');
    }

    const coords = new Coordinates(
      payload.outerRow,
      payload.outerCol,
      payload.innerRow,
      payload.innerCol,
    );

    const move = new Move(coords, player);
    game.makeMove(move);

    this.server.to(payload.gameId).emit('gameStateChanged', game);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    const player = this.players.get(client.id);

    if (!player) {
      return; // how can this happen??
    }

    player.connected = false;
    this.games.forEach((game) => {
      if (!game.active && !game.over && game.containsPlayer(client.id)) {
        game.removePlayer(client.id);
        this.logger.log(`Current admin: ${game.admin}`);
        client.to(game.id).emit('gameStateChanged', game);
      }
    });
  }
}
