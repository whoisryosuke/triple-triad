import * as Tone from "tone";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  Card,
  GameMode,
  GameRules,
  GameTileIndices,
  PlayerIndex,
} from "../types/game";
import { AllCardIds } from "../data/cards";
// import type {} from "@redux-devtools/extension"; // required for devtools typing

export type CardInPlay = {
  card: AllCardIds;
  owner: PlayerIndex;
};

interface GameState {
  mode: GameMode;
  setMode: (mode: GameMode) => void;
  score: Record<PlayerIndex, number>;
  setScore: (player: PlayerIndex, score: number) => void;
  startTime: number;
  setStartTime: (startTime: number) => void;
  rules: GameRules[];
  setRules: (rules: GameRules[]) => void;
  cards: Record<PlayerIndex, Set<AllCardIds>>;
  addCard: (player: PlayerIndex, card: AllCardIds) => void;
  removeCard: (player: PlayerIndex, card: AllCardIds) => void;
  setCards: (player: PlayerIndex, cards: Set<AllCardIds>) => void;

  board: Record<GameTileIndices, CardInPlay | undefined>;
  playCard: (gameTile: GameTileIndices, card: CardInPlay) => void;
}

export const useGameStore = create<GameState>()(
  devtools((set) => ({
    mode: "CARD-SELECTION",
    setMode: (mode) =>
      set(() => ({
        mode,
      })),

    score: {
      1: 5,
      2: 5,
    },
    setScore: (playerIndex, score) =>
      set((state) => ({
        score: {
          ...state.score,
          [playerIndex]: score,
        },
      })),
    startTime: 0,
    setStartTime: (startTime) =>
      set(() => ({
        startTime,
      })),
    rules: [],
    setRules: (rules) =>
      set(() => ({
        rules,
      })),
    cards: {
      1: new Set(),
      2: new Set(),
    },
    addCard: (playerIndex, card) =>
      set((state) => {
        state.cards[playerIndex].add(card);
        return {
          cards: state.cards,
        };
      }),
    removeCard: (playerIndex, card) =>
      set((state) => {
        state.cards[playerIndex].delete(card);
        return {
          cards: state.cards,
        };
      }),
    setCards: (playerIndex, cards) =>
      set((state) => ({
        cards: {
          ...state.cards,
          [playerIndex]: cards,
        },
      })),

    board: {
      2: undefined,
      1: undefined,
      3: undefined,
      4: undefined,
      5: undefined,
      6: undefined,
      7: undefined,
      8: undefined,
      9: undefined,
    },
    playCard: (gameTile, card) =>
      set((state) => ({
        board: {
          ...state.board,
          [gameTile]: card,
        },
      })),
  }))
);
