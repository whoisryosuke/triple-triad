import { useEffect, useRef } from "react";
import { useGameStore } from "../../../../store/game";
import { changeOwner } from "../../../../features/card-logic";

export const useFlipCards = () => {
  const {
    flips,
    removeFlip,
    placeCardOnBoard,
    board,
    setEvaluating,
    setTurn,
    turn,
  } = useGameStore();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (flips.length > 0) {
      timeoutRef.current = setTimeout(() => {
        const flipTile = flips[0];
        const currentCard = board[flipTile];
        if (currentCard) {
          const updatedCard = {
            ...currentCard,
            owner: changeOwner(currentCard.owner),
          };
          placeCardOnBoard(flipTile, updatedCard);
          removeFlip(flipTile);
        }
      }, 300);
      console.log("flips", flips);
      if (flips.length === 0) {
        setEvaluating(false);

        setTurn(changeOwner(turn));
      }
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [flips]);
};
