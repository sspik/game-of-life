import React, { FC, ChangeEvent } from "react";
import { ISettings } from "./game/game";

interface IMenuPros extends ISettings {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleStartGame: () => void;
  handleStopGame: () => void;
  handleRestartGame: () => void;
}

export const Menu: FC<IMenuPros> = (props) => {
  const {
    handleChange,
    tickTime,
    density,
    objectSize,
    resolutionWidth,
    resolutionHeight,
    handleStartGame,
    handleStopGame,
    handleRestartGame,
  } = props;

  return (
    <div className="menu">
      <div className="menu_header">
        <p>
          Game of life
        </p>
      </div>
      <div className="menu_body">
        <div className="menu_input">
          <label>
            <span>
              Tick time
            </span>
            <input
              type="number"
              name="tickTime"
              value={tickTime}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="menu_input">
          <label>
            <span>
              Density
            </span>
            <input
              type="number"
              name="density"
              value={density}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="menu_input">
          <label>
            <span>
              Object Size
            </span>
            <input
              type="number"
              name="objectSize"
              value={objectSize}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="menu_input">
          <label>
            <span>
              Resolution
            </span>
            <input
              type="number"
              name="resolutionWidth"
              value={resolutionWidth}
              onChange={handleChange}
              placeholder="width"
            />
            <input
              type="number"
              name="resolutionHeight"
              value={resolutionHeight}
              onChange={handleChange}
              placeholder="height"
            />
          </label>
        </div>
        <div className="menu_input">
          <button
            onClick={handleStartGame}
          >
            Start
          </button>
        </div>
        <div className="menu_input">
          <button
            onClick={handleStopGame}
          >
            Stop
          </button>
        </div>
        <div className="menu_input">
          <button
            onClick={handleRestartGame}
          >
            Restart
          </button>
        </div>
      </div>
    </div>
  )
}
