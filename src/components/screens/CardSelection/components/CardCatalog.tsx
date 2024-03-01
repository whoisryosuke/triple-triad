import React from "react";
import cards from "../../../../data/cards";
import CatalogCard from "./CatalogCard";

type Props = {};

const CardCatalog = (props: Props) => {
  const displayCards = cards.map((card) => <CatalogCard card={card} />);
  return <div>{displayCards}</div>;
};

export default CardCatalog;
