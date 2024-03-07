import React, { useEffect } from "react";
import { useGameStore } from "../../../store/game";
import CountdownClock from "./components/CountdownClock";
import GameBoard from "./components/GameBoard";
import PlayerCards from "./components/PlayerCards";
import OpponentCards from "./components/OpponentCards";
import { useOpponentAI } from "./hooks/OpponentAI";
import { useFlipCards } from "./hooks/FlipCards";
import GameOverMessage from "./components/GameOverMessage";
import MatchScore from "./components/MatchScore";
import useGameComplete from "./hooks/GameComplete";

type Props = {};

const Match = (props: Props) => {
  const { turn, board, mode } = useGameStore();
  useOpponentAI();
  useFlipCards();
  useGameComplete();

  console.log("[MATCH] Board", board);
  console.log("[MATCH] Mode", mode);
  console.log("[MATCH] Who's turn?", turn);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <CountdownClock />
        <h3>{turn === 1 ? "Your turn" : "Opponent's turn"}</h3>
        <MatchScore />
        <PlayerCards />
      </div>
      <GameBoard />
      <OpponentCards />
      {mode === "GAME-OVER" && <GameOverMessage />}
    </div>
  );
};

export default Match;
