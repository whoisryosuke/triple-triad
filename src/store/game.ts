import * as Tone from "tone";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Card, GameMode, GameRules, PlayerIndex } from "../types/game";
import { AllCardIds } from "../data/cards";
// import type {} from "@redux-devtools/extension"; // required for devtools typing

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
  setCards: (player: PlayerIndex, cards: Set<AllCardIds>) => void;
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
    setCards: (playerIndex, cards) =>
      set((state) => ({
        cards: {
          ...state.cards,
          [playerIndex]: cards,
        },
      })),
  }))
);
