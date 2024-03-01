import React from "react";
import allCards, { AllCardIds } from "../../../../data/cards";
import CatalogCard from "./CatalogCard";
import { useGameStore } from "../../../../store/game";
import "./CardCatalog.css";

type Props = {};

const CardCatalog = (props: Props) => {
  const { cards, addCard } = useGameStore();

  const handleAddToCatalog = (card: AllCardIds) => {
    if (cards[1].size < 5) {
      addCard(1, card);
    }
  };

  const displayCards = Object.entries(allCards).map(([id, card]) => (
    <CatalogCard
      id={id as AllCardIds}
      selected={cards[1].has(id as AllCardIds)}
      onClick={handleAddToCatalog}
      style={{ margin: 8 }}
    />
  ));
  return <div className="card-catalog">{displayCards}</div>;
};

export default CardCatalog;
