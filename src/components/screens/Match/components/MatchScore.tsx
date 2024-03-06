import React from "react";
import { useGameStore } from "../../../../store/game";
import generateScore from "../../../../features/generate-score";

type Props = {};

const MatchScore = (props: Props) => {
  const { board } = useGameStore();
  const scores = generateScore(board);
  return (
    <div>
      {scores.player} / {scores.opponent}
    </div>
  );
};

export default MatchScore;
