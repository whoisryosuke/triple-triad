import React from "react";
import CatalogCard, {
  CatalogCardProps,
} from "../../CardSelection/components/CatalogCard";
import { DropResult, ITEM_TYPES } from "../../../../constants/dnd";
import { useDrag } from "react-dnd";
import { useGameStore } from "../../../../store/game";
import { AllCardIds } from "../../../../data/cards";

type Props = CatalogCardProps;

const GameBoardCard = ({ id }: Props) => {
  const { playCard } = useGameStore();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ITEM_TYPES.CARD,
    item: { name: id },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      console.log("dropped?", item, dropResult);
      if (item && dropResult) {
        console.log(`You dropped ${item.name} into ${dropResult.id}!`);

        playCard(dropResult.id, {
          card: item.name,
          owner: 1,
        });
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));
  return <CatalogCard ref={drag} id={id} selected={isDragging} />;
};

export default GameBoardCard;
