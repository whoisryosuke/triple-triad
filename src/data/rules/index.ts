import { GameRule, GameRules } from "../../types/game";

const allOpen: GameRule = {
  name: "All Open",
  description: "All cards visible between players",
};
const threeOpen: GameRule = {
  name: "Three Open",
  description: "First three cards visible between players",
};

const rules: Record<GameRules, GameRule> = {
  "all-open": allOpen,
  "three-open": threeOpen,
};

export default rules;
