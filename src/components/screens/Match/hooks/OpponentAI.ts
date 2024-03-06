import { useEffect, useRef } from "react";
import { useGameStore } from "../../../../store/game";
import { AllCardIds } from "../../../../data/cards";
import { GameTileIndices } from "../../../../types/game";
import { playCard } from "../../../../features/card-logic";

export const useOpponentAI = () => {
  const { turn, board, cards } = useGameStore();
  // Keep track if opponent's turn is active
  // This prevents multiple re-renders triggering extra "moves"
  const isPlaying = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Get empty grid tiles
  const emptySlots = Object.entries(board).filter(
    ([tileId, card]) => card === null
  );
  // Keep an array of all cards on the board for reference
  const cardsInPlay = Object.values(board);

  const enemyMove = () => {
    console.log("[ENEMY TURN] Starting");
    // For now just pick a random empty spot and fill it
    // Find empty slot
    const randomEmptySlotIndex = Math.floor(Math.random() * emptySlots.length);
    const randomEmptySlot = emptySlots[randomEmptySlotIndex][0];
    // Find a random card that isn't being played
    const displayCards = [...cards[2]].filter(
      (card) =>
        !cardsInPlay.find(
          (cardInPlay) => cardInPlay?.card === card && cardInPlay.owner === 2
        )
    );
    const randomCardIndex = Math.floor(Math.random() * displayCards.length);
    const randomCard = displayCards[randomCardIndex];
    if (!randomCard) return;

    // Play it
    console.log(
      "[ENEMY TURN] Playing card",
      emptySlots,
      randomEmptySlot,
      randomCard,
      displayCards
    );
    playCard(parseInt(randomEmptySlot) as GameTileIndices, {
      card: randomCard,
      owner: 2,
      currentOwner: 2,
    });
  };

  // If it's the opponent's turn, handle their move
  useEffect(() => {
    // Is it opponent's turn? And is there an empty slot?
    if (turn === 2 && emptySlots.length > 0 && !isPlaying.current) {
      isPlaying.current = true;

      const min = 600;
      const max = 1500;
      const randomWaitTime = Math.floor(Math.random() * (max - min + 1) + min);

      timeoutRef.current = setTimeout(enemyMove, randomWaitTime);
    }
    // We reset the flag when we detect the turn officially switch
    if (turn === 1) {
      isPlaying.current = false;
    }

    return () => {
      if (timeoutRef.current) {
        isPlaying.current = false;
        clearTimeout(timeoutRef.current);
      }
    };
  }, [turn]);
};
