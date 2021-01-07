type Timeout = ReturnType<typeof setTimeout>;

interface ITimer {
  active: boolean;
  start: () => void;
  stop: () => void;
}

export class Timer implements ITimer {
  public active: boolean;
  private interval: Timeout;

  constructor(
    private handler: () => void,
    private tickTime: number,
  ){
    this.active = false;
    this.interval = false as unknown as Timeout;
  }

  public start(){
    this.active = true;
    this.interval = setInterval(this.handler, this.tickTime);
  }

  public stop(){
    this.active = false;
    clearInterval(this.interval);
  }
}
