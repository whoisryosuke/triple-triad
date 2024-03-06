import { AllCardIds } from "../data/cards";

// Player 1 = user. Player 2 = opponent.
export type PlayerIndex = 1 | 2;
// The star value on the card. Conveys the "tier"
export type CardRating = 1 | 2 | 3 | 4 | 5;

export type Card = {
  name: string;
  img: string;
  rating: CardRating;
  value: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
};

export type GameTileIndices = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type CardInPlay = {
  card: AllCardIds;
  owner: PlayerIndex;
  currentOwner: PlayerIndex;
};
export type GameBoard = Record<GameTileIndices, CardInPlay | null>;

export type GameRules = "all-open" | "three-open";
export type GameRule = {
  name: string;
  description: string;
};

export type GameMode = "CARD-SELECTION" | "MATCH" | "GAME-OVER";
