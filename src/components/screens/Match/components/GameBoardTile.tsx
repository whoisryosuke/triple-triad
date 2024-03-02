import React from "react";
import "./GameBoardTile.css";
import { useDrop } from "react-dnd";
import { DropResult, ITEM_TYPES } from "../../../../constants/dnd";
import CatalogCard from "../../CardSelection/components/CatalogCard";
import { useGameStore } from "../../../../store/game";
import { GameTileIndices } from "../../../../types/game";

type Props = {
  id: number;
};

const GameBoardTile = ({ id, ...props }: Props) => {
  const { board } = useGameStore();

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ITEM_TYPES.CARD,
    drop: () => ({ id } as DropResult),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;
  let state = "";
  if (isActive) {
    state = "hovered";
  } else if (canDrop) {
    state = "notice";
  }

  const tileCard = board[id as GameTileIndices]?.card;

  return (
    <div ref={drop} className={`game-board-tile ${state}`} {...props}>
      {tileCard && <CatalogCard id={tileCard} />}
    </div>
  );
};

export default GameBoardTile;
