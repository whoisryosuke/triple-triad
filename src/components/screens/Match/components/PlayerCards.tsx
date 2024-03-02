import React from "react";
import { useGameStore } from "../../../../store/game";
import "../../CardSelection/components/SelectedCards.css";
import { AllCardIds } from "../../../../data/cards";
import GameBoardCard from "./GameBoardCard";

type Props = {};

const PlayerCards = (props: Props) => {
  const { cards, removeCard, board } = useGameStore();

  const handleRemoveCard = (card: AllCardIds) => {
    removeCard(1, card);
  };

  const cardsInPlay = Object.values(board);

  const displayCards = [...cards[1]]
    .filter(
      (card) =>
        !cardsInPlay.find(
          (cardInPlay) => cardInPlay?.card === card && cardInPlay.owner === 1
        )
    )
    .map((card) => (
      <GameBoardCard
        key={card}
        id={card}
        small
        style={{ marginBottom: "8px" }}
        onClick={handleRemoveCard}
      />
    ));
  return <div className="selected-cards">{displayCards}</div>;
};

export default PlayerCards;
