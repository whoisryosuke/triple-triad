import React from "react";
import { useGameStore } from "../../../../store/game";
import CatalogCard from "./CatalogCard";

type Props = {};

const SelectedCards = (props: Props) => {
  const { cards } = useGameStore();
  const displayCards = cards[1].map((card) => (
    <CatalogCard card={card} selected />
  ));
  return <div></div>;
};

export default SelectedCards;
