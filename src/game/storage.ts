import { GameObject } from "./gameObject"

export class Storage {

  private storageSize: number;

  constructor(public objects: GameObject[][]){
    this.storageSize = objects.length;
  }

  public newObjects(objects: GameObject[][]){
    this.storageSize = objects.length;
    this.objects = objects;
  }

  public getObject(coords: number[]): GameObject {
    const [ x, y ] = coords;
    const xPosition = (x + this.storageSize) % this.storageSize;
    const yPosition = (y + this.storageSize) % this.storageSize;
    return this.objects[xPosition][yPosition];
  }

  public getAreaObjects(coords: number[]): GameObject[] {
    const [ x, y ] = coords;
    const coordsArea = [
      [x - 1, y - 1],
      [x - 1, y    ],
      [x - 1, y + 1],
      [x    , y + 1],
      [x + 1, y + 1],
      [x + 1, y    ],
      [x + 1, y - 1],
      [x    , y - 1],
    ];
    return coordsArea.map(c => this.getObject(c)).filter(c => !!c);
  }
}
