import { GameBoard } from "../types/game";

const generateScore = (board: GameBoard) => {
  const allPlayedCards = Object.values(board);
  const scores = allPlayedCards.reduce(
    (sum, card) => {
      if (card?.currentOwner === 1) sum.player += 1;
      if (card?.currentOwner === 2) sum.opponent += 1;
      return sum;
    },
    {
      player: 0,
      opponent: 0,
    }
  );

  return scores;
};

export default generateScore;
