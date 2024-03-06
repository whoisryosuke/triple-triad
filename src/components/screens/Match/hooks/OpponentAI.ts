import { useEffect } from "react";
import { useGameStore } from "../../../../store/game";
import { AllCardIds } from "../../../../data/cards";
import { GameTileIndices } from "../../../../types/game";
import { playCard } from "../../../../features/card-logic";

export const useOpponentAI = () => {
  const { turn, board, placeCardOnBoard, cards, setCards, setTurn } =
    useGameStore();
  const emptySlots = Object.entries(board).filter(
    ([tileId, card]) => card === null
  );
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
    console.log("[ENEMY TURN] Checking for turn", emptySlots.length);
    if (turn === 2 && emptySlots.length > 0) {
      enemyMove();
    }
  }, [turn]);
};
