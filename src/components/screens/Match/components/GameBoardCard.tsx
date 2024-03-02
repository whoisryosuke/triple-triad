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
  const { playCard, turn, setTurn } = useGameStore();

  // Setup drag and drop functionality
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ITEM_TYPES.CARD,
    item: { name: id },
    // Callback when item is dropped
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (item && dropResult) {
        // console.log(`You dropped ${item.name} into ${dropResult.id}!`);

        // Play the card!
        playCard(dropResult.id, {
          card: item.name,
          owner: 1,
        });
        // Change the turns over
        setTurn(2);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
    // canDrag: () => turn === 1,
  }));
  return (
    <CatalogCard ref={turn === 1 ? drag : null} id={id} selected={isDragging} />
  );
};

export default GameBoardCard;
