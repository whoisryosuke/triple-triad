import { useEffect, useRef } from "react";
import { useGameStore } from "../../../../store/game";
import { changeOwner } from "../../../../features/card-logic";

export const useFlipCards = () => {
  const {
    flips,
    removeFlip,
    placeCardOnBoard,
    board,
    evaluating,
    setEvaluating,
    setTurn,
    turn,
  } = useGameStore();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFlipping = useRef<boolean>(false);

  useEffect(() => {
    if (evaluating && flips.length > 0) {
      // Remember that we've started flipping
      isFlipping.current = true;
      timeoutRef.current = setTimeout(() => {
        const flipTile = flips[0];
        const currentCard = board[flipTile];
        if (currentCard) {
          // Update the card with new owner
          const updatedCard = {
            ...currentCard,
            currentOwner: changeOwner(currentCard.currentOwner),
          };
          placeCardOnBoard(flipTile, updatedCard);

          // Remove from the flip queue
          removeFlip(flipTile);
        }
      }, 300);
    }
    console.log("flips", flips);
    if (evaluating && flips.length === 0 && isFlipping.current) {
      console.log("[FLIP] Changing turns");
      setEvaluating(false);
      setTurn(changeOwner(turn));
      isFlipping.current = false;
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [evaluating, flips]);
};
