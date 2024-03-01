import React, { CSSProperties } from "react";
import { Card } from "../../../../types/game";
import "./CatalogCard.css";
import allCards, { AllCardIds } from "../../../../data/cards";

type Props = {
  id: AllCardIds;
  selected?: boolean;
  small?: boolean;
  scale?: CSSProperties["width"];
  onClick?: (card: AllCardIds) => void;
  style?: CSSProperties;
};

const CatalogCard = ({
  id,
  selected = false,
  onClick,
  scale = 1,
  small,
  style = {},
  ...props
}: Props) => {
  const card = allCards[id];
  const handleClick = () => {
    onClick?.(id);
  };
  return (
    <div
      className={`catalog-card ${selected ? "selected" : ""} ${
        small ? "small" : ""
      }`}
      style={{
        backgroundImage: `url(/assets/cards/${card.img})`,
        transform: `scale(${scale})`,
        ...style,
      }}
      onClick={handleClick}
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
