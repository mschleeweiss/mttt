export class TimeLimit {
  durationInSeconds: number;

  constructor(durationInSeconds: number) {
      this.durationInSeconds = durationInSeconds;
  }

  public decrementBy(durationInSeconds) {
    this.durationInSeconds -= durationInSeconds;
  }

  public isExpired() {
      return this.durationInSeconds <= 0;
  }
}
