import React from "react";
import CatalogCard, {
  CatalogCardProps,
} from "../../CardSelection/components/CatalogCard";
import { DropResult, ITEM_TYPES } from "../../../../constants/dnd";
import { useDrag } from "react-dnd";
import { useGameStore } from "../../../../store/game";
import { playCard } from "../../../../features/card-logic";

type Props = CatalogCardProps;

const GameBoardCard = ({ id, owner }: Props) => {
  const { evaluating, turn } = useGameStore();

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
          currentOwner: 1,
        });
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
    // canDrag: () => turn === 1,
  }));

  const isPlayersTurn = turn === 1;
  const isGameEvaluating = !evaluating;

  return (
    <CatalogCard
      ref={isPlayersTurn && isGameEvaluating ? drag : null}
      id={id}
      owner={owner}
      selected={isDragging}
    />
  );
};

export default GameBoardCard;
