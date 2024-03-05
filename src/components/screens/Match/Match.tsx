import React, { useEffect } from "react";
import { useGameStore } from "../../../store/game";
import CountdownClock from "./components/CountdownClock";
import GameBoard from "./components/GameBoard";
import PlayerCards from "./components/PlayerCards";
import OpponentCards from "./components/OpponentCards";
import { useOpponentAI } from "./hooks/OpponentAI";
import { useFlipCards } from "./hooks/FlipCards";

type Props = {};

const Match = (props: Props) => {
  const { turn, board } = useGameStore();
  useOpponentAI();
  useFlipCards();

  console.log("[MATCH] Board", board);

  return (
    <div style={{ display: "flex" }}>
      <div>
        <CountdownClock />
        <h3>{turn === 1 ? "Your turn" : "Opponent's turn"}</h3>
        <PlayerCards />
      </div>
      <GameBoard />
      <OpponentCards />
    </div>
  );
};

export default Match;
