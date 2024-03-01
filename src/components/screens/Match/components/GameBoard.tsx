import React from "react";
import GameBoardTile from "./GameBoardTile";
import "./GameBoard.css";

type Props = {};

const GameBoard = (props: Props) => {
  return (
    <div className="game-board">
      {new Array(9).fill(0).map((_, index) => (
        <GameBoardTile id={index} />
      ))}
    </div>
  );
};

export default GameBoard;
