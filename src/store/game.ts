import * as Tone from "tone";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Card, GameMode, GameRules, PlayerIndex } from "../types/game";
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
  cards: Record<PlayerIndex, Card[]>;
  setCards: (player: PlayerIndex, cards: Card[]) => void;
}

export const useGameStore = create<GameState>()(
  devtools((set) => ({
    mode: "CARD-SELECTION",
    setMode: (mode) =>
      set(() => ({
        mode,
      })),

    score: {
      1: 0,
      2: 0,
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
      1: [],
      2: [],
    },
    setCards: (playerIndex, cards) =>
      set((state) => ({
        score: {
          ...state.score,
          [playerIndex]: cards,
        },
      })),
  }))
);
