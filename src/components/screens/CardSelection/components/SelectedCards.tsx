import React from "react";
import { useGameStore } from "../../../../store/game";
import CatalogCard from "./CatalogCard";
import "./SelectedCards.css";
import { AllCardIds } from "../../../../data/cards";

type Props = {};

const SelectedCards = (props: Props) => {
  const { cards, removeCard } = useGameStore();

  const handleRemoveCard = (card: AllCardIds) => {
    removeCard(1, card);
  };

  const displayCards = [...cards[1]].map((card) => (
    <CatalogCard
      id={card}
      small
      style={{ marginBottom: "8px" }}
      onClick={handleRemoveCard}
    />
  ));
  return <div className="selected-cards">{displayCards}</div>;
};

export default SelectedCards;
