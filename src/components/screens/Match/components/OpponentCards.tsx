import React from "react";
import { useGameStore } from "../../../../store/game";
import "../../CardSelection/components/SelectedCards.css";
import CatalogCard from "../../CardSelection/components/CatalogCard";

type Props = {};

const OpponentCards = (props: Props) => {
  const { cards, board } = useGameStore();

  const cardsInPlay = Object.values(board);

  const displayCards = [...cards[2]]
    .filter(
      (card) =>
        !cardsInPlay.find(
          (cardInPlay) => cardInPlay?.card === card && cardInPlay.owner === 2
        )
    )
    .map((card) => (
      <CatalogCard key={card} id={card} small style={{ marginBottom: "8px" }} />
    ));
  return <div className="selected-cards">{displayCards}</div>;
};

export default OpponentCards;
