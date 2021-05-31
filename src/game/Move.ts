import { Coordinates } from './Coordinates';
import { Player } from './Player';

export class Move {
  coordinates: Coordinates;
  player: Player;
  timestamp: Date;

  constructor(coordinates: Coordinates, player: Player) {
    this.coordinates = coordinates;
    this.player = player;
    this.timestamp = new Date();
  }
}
