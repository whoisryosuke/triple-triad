import React, { useEffect } from "react";
import { useGameStore } from "../../../store/game";
import CountdownClock from "./components/CountdownClock";
import GameBoard from "./components/GameBoard";
import PlayerCards from "./components/PlayerCards";

type Props = {};

const Match = (props: Props) => {
  const { turn } = useGameStore();

  return (
    <div style={{ display: "flex" }}>
      <div>
        <CountdownClock />
        <h3>{turn === 1 ? "Your turn" : "Opponent's turn"}</h3>
        <PlayerCards />
      </div>
      <GameBoard />
    </div>
  );
};

export default Match;
