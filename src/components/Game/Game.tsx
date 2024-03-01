import React from "react";
import { useGameStore } from "../../store/game";
import CardSelection from "../screens/CardSelection/CardSelection";
import Match from "../screens/Match/Match";
import GameOver from "../screens/GameOver/GameOver";

type Props = {};

const Game = (props: Props) => {
  const { mode } = useGameStore();
  let Route: (props: any) => JSX.Element;
  switch (mode) {
    default:
    case "CARD-SELECTION":
      Route = CardSelection;
      break;
    case "MATCH":
      Route = Match;
      break;
    case "GAME-OVER":
      Route = GameOver;
      break;
  }
  return <Route />;
};

export default Game;
