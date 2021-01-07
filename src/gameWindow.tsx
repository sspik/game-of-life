import React, { FC } from "react";

interface IGameWindowsProps {
  canvasRef: any;
}

export const GameWindow: FC<IGameWindowsProps> = (props) => {

  const { canvasRef } = props;

  return (
    <div className="game">
      <canvas ref={canvasRef} />
    </div>
  )
}
