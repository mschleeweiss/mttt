export class Settings {
  blitzModeActive: boolean;
  timeLimitInMinutes: number;

  constructor(blitzModeActive: boolean, timeLimitInMinutes) {
    this.blitzModeActive = blitzModeActive;
    this.timeLimitInMinutes = timeLimitInMinutes;

  }
}
