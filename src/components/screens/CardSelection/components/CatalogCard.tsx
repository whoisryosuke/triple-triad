import React, { CSSProperties, ForwardedRef, forwardRef } from "react";
import "./CatalogCard.css";
import allCards, { AllCardIds } from "../../../../data/cards";
import { PlayerIndex } from "../../../../types/game";

export type CatalogCardProps = {
  id: AllCardIds;
  selected?: boolean;
  small?: boolean;
  scale?: CSSProperties["width"];
  owner: PlayerIndex;
  onClick?: (card: AllCardIds) => void;
  style?: CSSProperties;
};

const CatalogCard = (
  {
    id,
    selected = false,
    onClick,
    scale = 1,
    small,
    owner,
    style = {},
    ...props
  }: CatalogCardProps,
  ref: ForwardedRef<HTMLDivElement>
) => {
  const card = allCards[id];
  const handleClick = () => {
    onClick?.(id);
  };
  return (
    <div
      ref={ref}
      className={`catalog-card ${selected ? "selected" : ""} ${
        small ? "small" : ""
      } ${owner === 1 ? "player" : "opponent"}`}
      style={{
        transform: `scale(${scale})`,
        ...style,
      }}
      onClick={handleClick}
    >
      <div className="opponent" style={{ opacity: owner === 2 ? 1 : 0 }} />
      <div className="player" style={{ opacity: owner === 1 ? 1 : 0 }} />
      <img src={`/assets/cards/${card.img}`} alt={card.name} />
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

export default forwardRef(CatalogCard);
