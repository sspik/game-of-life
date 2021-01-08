import * as _ from "lodash";

import { Storage } from "./storage";
import { Display } from "./display";
import { Timer } from "./timer";
import { GameObject } from "./gameObject";

export interface ISettings {
  objectSize: number;
  resolutionWidth: number;
  resolutionHeight: number;
  tickTime: number;
  density: number;
}

export class Game {

  private readonly display: Display;
  private readonly storage: Storage;
  private timer: Timer;

  constructor(
    private settings: ISettings,
    private canvas: HTMLCanvasElement
  ){
    this.storage = new Storage(this.createObjects());
    this.timer = new Timer(
      () => this.tick(),
      settings.tickTime
    );
    this.display = new Display(
      this.settings.resolutionWidth,
      this.settings.resolutionHeight,
      this.settings.objectSize,
      this.canvas,
      this.storage,
    );
    this.addEvents();
    this.display.draw();
  };

  public start(): void{
    !this.timer.active && this.timer.start();
  }

  public stop(): void {
    this.timer.active && this.timer.stop();
  }

  public restart(): void {
    this.stop();
    this.storage.newObjects(this.createObjects());
    this.display.draw();
  }

  public clear(): void {
    this.stop();
    this.storage.newObjects(this.createObjects(true));
    this.display.draw();
  }

  public started(): boolean {
    return this.timer.active;
  }

  private createObjects(clear: boolean = false): GameObject[][] {
    let objects: GameObject[][] = [];
    const sideX = this.settings.resolutionHeight / this.settings.objectSize;
    const sideY = this.settings.resolutionWidth / this.settings.objectSize;
    for (let x = 0; x < sideX; x += 1) {
      let axis: GameObject[] = []
      for (let y = 0; y < sideY; y += 1) {
        axis.push(new GameObject(
          clear ? false : _.random(this.settings.density) === 0
        ))
      }
      objects.push(axis)
    }
    return objects;
  }

  private tick(): void {
    this.storage.objects = _.cloneDeep(this.storage.objects).map((row, x) => {
      return row.map((obj, y) => {
        const areaObjects = this.storage.getAreaObjects([x, y]);
        const areaObjectsIsLife = areaObjects.filter(o => o.isLife);
        if (!obj.isLife && areaObjectsIsLife.length === 3) {
          obj.isLife = true
        } else if (obj.isLife && (areaObjectsIsLife.length < 2 || areaObjectsIsLife.length > 3)) {
          obj.isLife = false
        }
        return obj
      })
    })
    this.display.draw()
  }

  private addEvents(): void {

    const mousePosition = {
      x: 0,
      y: 0,
    }

    let mouseDown = false;

    const rect = this.canvas.getBoundingClientRect();

    const draw = () => {
      const x = Math.floor(mousePosition.x / this.settings.objectSize);
      const y = Math.floor(mousePosition.y / this.settings.objectSize);
      if (mouseDown){

        this.storage.getObject([y, x]).isLife = true;
        this.display.draw();
      }
    }

    this.canvas.addEventListener('mousemove', function (e: MouseEvent){
      mousePosition.x = e.clientX - rect.left;
      mousePosition.y = e.clientY - rect.top;
    });
    this.canvas.addEventListener('mousedown', function (){
      mouseDown = true;
    })
    this.canvas.addEventListener('mouseup', function (){
      mouseDown = false;
    })
    this.canvas.addEventListener('mouseenter', function (e: MouseEvent){
      mousePosition.x = e.clientX - rect.left;
      mousePosition.y = e.clientY - rect.top;
    });
    this.canvas.addEventListener('mousemove', draw);
  }
}
