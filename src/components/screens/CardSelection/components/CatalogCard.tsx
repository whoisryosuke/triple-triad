import React from "react";
import { Card } from "../../../../types/game";
import "./CatalogCard.css";

type Props = {
  card: Card;
  selected?: boolean;
};

const CatalogCard = ({ card, selected = false, ...props }: Props) => {
  return (
    <div
      className={`catalog-card ${selected ? "selected" : ""}`}
      style={{
        backgroundImage: `url(/assets/cards/${card.img})`,
      }}
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
