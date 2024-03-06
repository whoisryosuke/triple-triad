import React from "react";
import "./GameOverMessage.css";
import { useGameStore } from "../../../../store/game";
import generateScore from "../../../../features/generate-score";

type Props = {};

const GameOverMessage = (props: Props) => {
  const { board, setMode, resetBoard, resetCards } = useGameStore();
  const scores = generateScore(board);
  const isWinner = scores.player > scores.opponent;

  const handlePlayAgain = () => {
    // Return to card selection
    setMode("CARD-SELECTION");
    // Reset the board
    resetBoard();
    // Reset everyone's cards
    resetCards();
  };

  return (
    <div className="game-over-modal">
      <div className="overlay" />
      <div className="container">
        <h1>{isWinner ? "You Win" : "You Lose"}</h1>
        <button onClick={handlePlayAgain}>Try again</button>
      </div>
    </div>
  );
};

export default GameOverMessage;
