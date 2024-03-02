import { AllCardIds } from "../data/cards";
import { GameTileIndices } from "../types/game";

export const ITEM_TYPES = {
  CARD: "CARD",
};

export type DropResult = {
  // The index of the grid tile we dropped on
  id: GameTileIndices;
};
