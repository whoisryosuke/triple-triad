import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  CardInPlay,
  GameBoard,
  GameMode,
  GameRules,
  GameTileIndices,
  PlayerIndex,
} from "../types/game";
import { AllCardIds } from "../data/cards";
// import type {} from "@redux-devtools/extension"; // required for devtools typing

const DEFAULT_GAME_BOARD: GameBoard = {
  2: null,
  1: null,
  3: null,
  4: null,
  5: null,
  6: null,
  7: null,
  8: null,
  9: null,
};

interface GameState {
  // The "router" basically.
  mode: GameMode;
  setMode: (mode: GameMode) => void;

  score: Record<PlayerIndex, number>;
  setScore: (player: PlayerIndex, score: number) => void;
  startTime: number;
  setStartTime: (startTime: number) => void;
  // Who's turn is it?
  turn: PlayerIndex;
  setTurn: (turn: PlayerIndex) => void;
  evaluating: boolean;
  setEvaluating: (evaluating: boolean) => void;
  flips: GameTileIndices[];
  queueFlip: (index: GameTileIndices) => void;
  removeFlip: (index: GameTileIndices) => void;

  rules: GameRules[];
  setRules: (rules: GameRules[]) => void;
  cards: Record<PlayerIndex, Set<AllCardIds>>;
  addCard: (player: PlayerIndex, card: AllCardIds) => void;
  removeCard: (player: PlayerIndex, card: AllCardIds) => void;
  setCards: (player: PlayerIndex, cards: Set<AllCardIds>) => void;
  resetCards: () => void;

  // Game board
  board: GameBoard;
  placeCardOnBoard: (gameTile: GameTileIndices, card: CardInPlay) => void;
  resetBoard: () => void;
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
    turn: 1,
    setTurn: (turn) =>
      set(() => ({
        turn,
      })),
    evaluating: false,
    setEvaluating: (evaluating) =>
      set(() => ({
        evaluating,
      })),
    flips: [],
    queueFlip: (index) =>
      set((state) => ({
        flips: [...state.flips, index],
      })),
    removeFlip: (index) =>
      set((state) => ({
        flips: state.flips.filter((flipIndex) => flipIndex !== index),
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
    resetCards: () =>
      set(() => ({
        cards: {
          1: new Set(),
          2: new Set(),
        },
      })),

    board: DEFAULT_GAME_BOARD,
    placeCardOnBoard: (gameTile, card) =>
      set((state) => ({
        board: {
          ...state.board,
          [gameTile]: card,
        },
      })),
    resetBoard: () =>
      set((state) => ({
        board: DEFAULT_GAME_BOARD,
      })),
  }))
);
