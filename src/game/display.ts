import { Storage } from "./storage";
import { GameObject } from "./gameObject";


export class Display {

  private ctx: CanvasRenderingContext2D;

  constructor(
    private resolutionWidth: number,
    private resolutionHeight: number,
    private objectSize: number,
    private canvas: HTMLCanvasElement,
    private storage: Storage,
  ){
    this.ctx = this.canvas.getContext("2d")!;
    this.canvas.width = resolutionWidth;
    this.canvas.height = resolutionHeight;
    this.ctx.beginPath();
    this.ctx.lineWidth = 0.2;
  }

  public draw(): void {
    this.clear();
    for (let x = 0; x < this.storage.objects.length; x += 1){
      for (let y = 0; y < this.storage.objects[x].length; y += 1) {
        this.createPixel(
          this.storage.objects[x][y],
          [x, y],
        )
      }
    }
  }

  private createPixel(obj: GameObject, coords: number[]): void {
    this.ctx.fillStyle = obj.isLife ? obj.color : 'white';
    this.ctx.fillRect(
      coords[1] * this.objectSize,
      coords[0] * this.objectSize,
      this.objectSize,
      this.objectSize,
    )
    this.ctx.strokeRect(
      coords[1] * this.objectSize,
      coords[0] * this.objectSize,
      this.objectSize,
      this.objectSize,
    )
  }

  private clear(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

}
