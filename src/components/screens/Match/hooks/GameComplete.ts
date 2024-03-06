import { useEffect } from "react";
import { useGameStore } from "../../../../store/game";

const useGameComplete = () => {
  const { board, mode, setMode } = useGameStore();

  useEffect(() => {
    const allGameTiles = Object.values(board);
    const totalCards = allGameTiles.reduce((sum, card) => {
      if (card !== null) sum += 1;
      return sum;
    }, 0);
    if (totalCards === 9 && mode !== "GAME-OVER") {
      console.log("[GAME COMPLETE] All cards played");
      setMode("GAME-OVER");
    }
  }, [board]);
};

export default useGameComplete;
