import React from "react";
import { useGameStore } from "../../../../store/game";
import CatalogCard from "./CatalogCard";

type Props = {};

const SelectedCards = (props: Props) => {
  const { cards } = useGameStore();
  const displayCards = [...cards[1]].map((card) => (
    <CatalogCard id={card} selected scale={0.5} />
  ));
  return <div>{displayCards}</div>;
};

export default SelectedCards;
