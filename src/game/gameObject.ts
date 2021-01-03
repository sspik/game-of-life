import { v4 as uuid4 } from "uuid";

interface IGameObject {
  coordinates: number[];
  id: string;
  color: string;
}

abstract class GameObjectBase {
  private readonly _id: string;
  constructor(public coordinates: number[]) {
    this._id = uuid4();
  }
  public get id(): string {
    return this._id
  }
}

export class GameObject extends GameObjectBase implements IGameObject {
  public color: string = '#00ff00';
}
