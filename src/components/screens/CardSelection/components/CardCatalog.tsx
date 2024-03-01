import React from "react";
import allCards, { AllCardIds } from "../../../../data/cards";
import CatalogCard from "./CatalogCard";
import { useGameStore } from "../../../../store/game";

type Props = {};

const CardCatalog = (props: Props) => {
  const { cards, addCard } = useGameStore();

  const handleAddToCatalog = (card: AllCardIds) => {
    addCard(1, card);
  };

  const displayCards = Object.entries(allCards).map(([id, card]) => (
    <CatalogCard id={id as AllCardIds} addCard={handleAddToCatalog} />
  ));
  return <div>{displayCards}</div>;
};

export default CardCatalog;
