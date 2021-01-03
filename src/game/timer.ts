interface ITimer {
  active: boolean;
  start: () => void;
  stop: () => void;
}

export class Timer implements ITimer {
  public active: boolean;
  private interval: number;

  constructor(
    private handler: () => void,
    private tickTime: number,
  ){}

  public start(){
    this.active = true;
    this.interval = setInterval(this.handler, this.tickTime);
  }

  public stop(){
    this.active = false;
    clearInterval(this.interval);
  }

}
