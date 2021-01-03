import * as _ from "lodash";

import { Storage } from "./storage";
import { Display } from "./display";
import { Timer } from "./timer";
import { GameObject } from "./gameObject";

type TSettings = {
  objectSize: number,
  resolution: number[],
  tickTime: number,
  density: number,
};

export class Game {

  private display: Display;
  private storage: Storage;
  private timer: Timer;

  constructor(private settings: TSettings){
    this.storage = new Storage(this.createObjects());
    this.timer = new Timer(() => console.log('work'), 200);
  };

  public start(): void{
    !this.timer.active && this.timer.start()
  }

  public stop(): void {
    this.timer.active && this.timer.stop();
  }

  private createObjects(): GameObject[] {
    let objects = [];
    for (let x = 0; x < this.settings.resolution[0]; x += 1) {
      for (let y = 0; y < this.settings.resolution[1]; y += 1) {
        _.random(100 - this.settings.density) === 0 &&
          objects.push(new GameObject([x, y]));
      }
    }
    return objects;
  }
}
