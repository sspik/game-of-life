import { v4 as uuid4 } from "uuid";

interface IGameObject {
  id: string;
  color: string;
  isLife: boolean;
}

abstract class GameObjectBase {
  private readonly _id: string;
  constructor(public isLife: boolean) {
    this._id = uuid4();
  }
  public get id(): string {
    return this._id
  }
}

export class GameObject extends GameObjectBase implements IGameObject {
  public color: string = '#1fbf1f';
}
