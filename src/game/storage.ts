import { GameObject } from "./gameObject"

export class Storage {

  private storageSizeX: number;
  private storageSizeY: number;

  constructor(public objects: GameObject[][]){
    this.storageSizeX = objects.length;
    this.storageSizeY = objects[0].length;
  }

  public newObjects(objects: GameObject[][]){
    this.storageSizeX = objects.length;
    this.storageSizeY = objects[0].length;
    this.objects = objects;
  }

  public getObject(coords: number[]): GameObject {
    const [ x, y ] = coords;
    const xPosition = (x + this.storageSizeX) % this.storageSizeX;
    const yPosition = (y + this.storageSizeY) % this.storageSizeY;
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
