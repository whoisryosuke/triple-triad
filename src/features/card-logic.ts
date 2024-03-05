import cards from "../data/cards";
import { CardInPlay, useGameStore } from "../store/game";
import { GameTileIndices, PlayerIndex } from "../types/game";

const ADJACENT_TILES = {
  1: [2, 4],
  2: [1, 3, 5],
  3: [2, 6],
  4: [1, 5, 7],
  5: [2, 4, 6, 8],
  6: [3, 5, 9],
  7: [4, 8],
  8: [7, 5, 9],
  9: [6, 8],
};

export const playCard = (gameTile: GameTileIndices, card: CardInPlay) => {
  console.log("[CARD LOGIC] Starting...");
  const {
    placeCardOnBoard,
    turn,
    setTurn,
    evaluating,
    setEvaluating,
    board,
    queueFlip,
  } = useGameStore.getState();

  const cardData = cards[card.card];
  const owner = card.owner;

  setEvaluating(true);

  // Play the card on the board
  placeCardOnBoard(gameTile, card);

  // Check against nearby cards
  // Figure out adjacent tiles
  const adjacentTiles = ADJACENT_TILES[gameTile];
  // Go through each tile and check ownership of card
  adjacentTiles.forEach((tileIndex) => {
    console.log("[CARD LOGIC] Checking all adjacent tiles");
    // Only check opponents cards
    const currentIndex = tileIndex as GameTileIndices;
    const currentTile = board[currentIndex];
    if (currentTile && currentTile?.owner !== owner) {
      const checkCardData = cards[currentTile.card];

      // What direction is this card relative to newly dropped card?
      // Is vertical
      const isBelow = gameTile + 3 === tileIndex;
      const isAbove = gameTile - 3 === tileIndex;
      // This card is below the card just dropped
      if (isBelow) {
        console.log("[CARD LOGIC] Is below");
        // Compare top/bottom card numbers
        if (cardData.value.bottom > checkCardData.value.top) {
          // Flip card!
          queueFlip(currentIndex);
        }
      }
      if (isAbove) {
        console.log("[CARD LOGIC] Is above");
        // Compare top/bottom card numbers
        if (cardData.value.top > checkCardData.value.bottom) {
          // Flip card!
          queueFlip(currentIndex);
        }
      }
      // Is horizontal
      const isRight = gameTile + 1 === tileIndex;
      const isLeft = gameTile - 1 === tileIndex;
      // This card is below the card just dropped
      if (isRight) {
        console.log("[CARD LOGIC] Is right");
        // Compare left/right card numbers
        if (cardData.value.right > checkCardData.value.left) {
          // Flip card!
          queueFlip(currentIndex);
        }
      }
      if (isLeft) {
        console.log("[CARD LOGIC] Is left");
        // Compare left/right card numbers
        if (cardData.value.left > checkCardData.value.right) {
          // Flip card!
          queueFlip(currentIndex);
        }
      }
    }
  });

  // Change the turns over
  setTurn(2);

  setEvaluating(false);
};

export const changeOwner = (currentOwner: PlayerIndex): PlayerIndex => {
  switch (currentOwner) {
    case 1:
      return 2;
    case 2:
      return 1;
  }
};
