import React from "react";
import { useGameStore } from "../../../store/game";
import CardCatalog from "./components/CardCatalog";
import SelectedCards from "./components/SelectedCards";
import "./CardSelection.css";
import { AllCardIds } from "../../../data/cards";

type Props = {};

const CardSelection = (props: Props) => {
  const { cards, setMode, setStartTime, setCards } = useGameStore();

  const handleStartGame = () => {
    // Give opponent cards
    const opponentCards = new Set([
      "sample1",
      "sample2",
      "sample3",
      "sample4",
      "sample5",
    ] as AllCardIds[]);
    setCards(2, opponentCards);

    setStartTime(new Date().getTime());
    setMode("MATCH");
    console.log("[CARD SELECT] START MATCH!!!");
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
