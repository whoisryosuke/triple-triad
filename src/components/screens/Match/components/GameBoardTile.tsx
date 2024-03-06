import React, { useEffect, useRef } from "react";
import "./GameBoardTile.css";
import { useDrop } from "react-dnd";
import { DropResult, ITEM_TYPES } from "../../../../constants/dnd";
import CatalogCard from "../../CardSelection/components/CatalogCard";
import { useGameStore } from "../../../../store/game";
import { GameTileIndices, PlayerIndex } from "../../../../types/game";

type Props = {
  id: number;
};

const GameBoardTile = ({ id, ...props }: Props) => {
  const { board } = useGameStore();
  const prevOwner = useRef<PlayerIndex | null>(null);

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

  useEffect(() => {
    // No owner? Hydrate with original owner of card
    if (!prevOwner.current && currentTile?.owner) {
      prevOwner.current = currentTile.owner;
    }

    // Owner exists and is different? Update!
    if (prevOwner.current && prevOwner.current === currentTile?.currentOwner) {
      // Trigger animation here?
      prevOwner.current = currentTile.currentOwner;
    }
  }, [currentTile]);

  return (
    <div ref={drop} className={`game-board-tile ${state}`} {...props}>
      {tileCard && currentTile && (
        <div
          className="card"
          style={{
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
