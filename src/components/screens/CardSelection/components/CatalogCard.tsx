import React, { CSSProperties } from "react";
import { Card } from "../../../../types/game";
import "./CatalogCard.css";
import allCards, { AllCardIds } from "../../../../data/cards";

type Props = {
  id: AllCardIds;
  selected?: boolean;
  scale?: CSSProperties["width"];
  addCard?: (card: AllCardIds) => void;
};

const CatalogCard = ({
  id,
  selected = false,
  addCard,
  scale = 1,
  ...props
}: Props) => {
  const card = allCards[id];
  const handleAddCard = () => {
    addCard?.(id);
  };
  return (
    <div
      className={`catalog-card ${selected ? "selected" : ""}`}
      style={{
        backgroundImage: `url(/assets/cards/${card.img})`,
        transform: `scale(${scale})`,
      }}
      onClick={handleAddCard}
    >
      <div className="frame" />
      <div className="card-metadata">
        <p className="vertical top">{card.value.top}</p>
        <p className="vertical bottom">{card.value.bottom}</p>
        <p className="horizontal left">{card.value.left}</p>
        <p className="horizontal right">{card.value.right}</p>
      </div>
    </div>
  );
};

export default CatalogCard;
