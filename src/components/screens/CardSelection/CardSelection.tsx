import React from "react";
import { useGameStore } from "../../../store/game";
import CardCatalog from "./components/CardCatalog";
import SelectedCards from "./components/SelectedCards";
import "./CardSelection.css";

type Props = {};

const CardSelection = (props: Props) => {
  const { cards, setMode } = useGameStore();

  const handleStartGame = () => {
    setMode("MATCH");
  };

  const isGameplayEnabled = cards[1].size === 5;

  return (
    <div className="card-selection">
      <SelectedCards />
      <CardCatalog />
      <button onClick={handleStartGame} disabled={!isGameplayEnabled}>
        {isGameplayEnabled ? "Start Game" : "Select more cards"}
      </button>
    </div>
  );
};

export default CardSelection;
