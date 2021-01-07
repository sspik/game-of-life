import React, {
  FC,
  useState,
  useRef,
  useEffect,
  ChangeEvent
} from 'react';
import { Menu } from "./menu";
import { GameWindow } from "./gameWindow";

import { Game, ISettings } from "./game/game";

import './App.css';

interface IAppState extends ISettings {
  [key: string]: number | number[]
}

const initState: IAppState = {
  tickTime: 20,
  objectSize: 10,
  resolutionWidth: window.innerWidth > 500 ? 1300 : 300,
  resolutionHeight: window.innerWidth > 500 ? 780 : 300,
  density: 2,
}

const minValues: IAppState = {
  tickTime: 20,
  objectSize: 5,
  resolutionWidth: 50,
  resolutionHeight: 50,
  density: 2,
}

export const App: FC = () => {
  const [ state, setState ] = useState<ISettings>(initState);
  const handleChangeSettings = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target)
    if (minValues[e.target.name] > parseInt(e.target.value)) return;
    setState({
      ...state,
      [ e.target.name ]: e.target.value,
    });
  }

  const canvasRef = useRef<HTMLCanvasElement>(null);

  let game: Game;

  useEffect(() => {
    if (canvasRef.current) {
      game = new Game(
        { ...state },
        canvasRef.current
      );
    }
  }, [state])

  const handleStartGame = () => game.start();
  const handleStopGame = () => game.stop();
  const handleRestartGame = () => game.restart();
  return (
    <div className="App">
      <Menu
        handleChange={handleChangeSettings}
        handleStartGame={handleStartGame}
        handleStopGame={handleStopGame}
        handleRestartGame={handleRestartGame}
        { ...state }
      />
      <GameWindow
        canvasRef={canvasRef}
      />
    </div>
  );
}
