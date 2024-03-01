import React from "react";
import { useGameStore } from "../../../store/game";
import CardCatalog from "./components/CardCatalog";
import SelectedCards from "./components/SelectedCards";

type Props = {};

const CardSelection = (props: Props) => {
  const { setMode } = useGameStore();

  const handleStartGame = () => {
    setMode("MATCH");
  };

  return (
    <div>
      <SelectedCards />
      <CardCatalog />
      <button onClick={handleStartGame}>Start Game</button>
    </div>
  );
};

export default CardSelection;
