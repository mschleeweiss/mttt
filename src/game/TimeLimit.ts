import { Observer, Subject } from "./ObserverPattern";
import { PlayerType } from "./PlayerType";

export class TimeLimit implements Subject {
  durationInSeconds: number;
  team: PlayerType;
  observers: Observer[] = [];

  constructor(durationInSeconds: number, team: PlayerType) {
    this.durationInSeconds = durationInSeconds;
    this.team = team;
  }

  public getState(): Object {
    return {
      durationInSeconds: this.durationInSeconds,
      team: this.team,
    };
  }

  public decrementBy(durationInSeconds) {
    this.durationInSeconds -= durationInSeconds;
    if (this.isExpired()) {
      this.notify();
    }
  }

  public incrementBy(durationInSeconds) {
    if (!this.isExpired()) {
      this.durationInSeconds += durationInSeconds;
    }
  }

  public isExpired() {
    return this.durationInSeconds <= 0;
  }


  public attach(observer: Observer): void {
    const exists = this.observers.includes(observer);
    if (!exists) {
      this.observers.push(observer);
    }
  }

  public detach(observer: Observer): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex >= 0) {
      this.observers.splice(observerIndex, 1);
    }
  }

  /**
   * Trigger an update in each subscriber.
   */
  public notify(): void {
    for (const observer of this.observers) {
      observer.update("expired");
    }
  }
}
