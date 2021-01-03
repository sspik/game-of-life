import { Game } from "./game";

const game = new Game({
  objectSize: 3,
  density: 50,
  resolution: [100, 100],
  tickTime: 200,
});

game.start();
