export class Settings {
  timerActive: boolean = false;
  timeLimitInMinutes: number = Infinity;
  readonly maxTimeLimit: number = 10;
  readonly minTimeLimit: number = 1;
}
