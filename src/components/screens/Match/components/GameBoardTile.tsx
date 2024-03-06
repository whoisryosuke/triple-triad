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

  const currentTileIndex = id as GameTileIndices;
  const currentTile = board[currentTileIndex];
  const tileCard = currentTile?.card;

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ITEM_TYPES.CARD,
    drop: () => ({ id } as DropResult),
    canDrop: () => {
      const { board } = useGameStore.getState();

      const currentTileIndex = id as GameTileIndices;
      const currentTile = board[currentTileIndex];
      const tileCard = currentTile?.card;
      return !tileCard && !currentTile;
    },
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

  return (
    <div ref={drop} className={`game-board-tile ${state}`} {...props}>
      {tileCard && currentTile && (
        <div
          style={{
            border: "3px solid",
            borderRadius: "4px",
            borderColor: currentTile.currentOwner === 1 ? "blue" : "red",
          }}
        >
          <CatalogCard id={tileCard} />
        </div>
      )}
    </div>
  );
};

export default GameBoardTile;
