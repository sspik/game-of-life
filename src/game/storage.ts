import { GameObject } from "./gameObject"

export class Storage {
  constructor(private objects: GameObject[]){}

  public getObject(coords: GameObject["coordinates"]): GameObject {
    return this.objects.filter(obj => obj.coordinates === coords)[0];
  }

  public setObject(gameObject:GameObject): void {
    this.objects.push(gameObject);
  }

  public deleteObject(coords: GameObject["coordinates"]): void {
    this.objects = this.objects.filter(obj => obj.coordinates !== coords);
  }

  public getAreaObjects(coords: GameObject["coordinates"]): GameObject[] {
    const [x, y] = coords;
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
    return coordsArea.map(c => this.getObject(c))
  }
}

