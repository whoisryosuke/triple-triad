import React from "react";
import GameBoardTile from "./GameBoardTile";
import "./GameBoard.css";

type Props = {};

const GameBoard = (props: Props) => {
  return (
    <div className="game-board">
      {new Array(9).fill(0).map((_, index) => (
        <GameBoardTile key={index} id={index + 1} />
      ))}
    </div>
  );
};

export default GameBoard;
