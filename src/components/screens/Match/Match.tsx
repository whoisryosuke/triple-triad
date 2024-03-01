import React, { useEffect } from "react";
import { useGameStore } from "../../../store/game";
import CountdownClock from "./components/CountdownClock";

type Props = {};

const Match = (props: Props) => {
  const { setStartTime } = useGameStore();

  // Start the clock!
  useEffect(() => {
    setStartTime(new Date().getTime());
  }, []);

  return (
    <div>
      <CountdownClock />
    </div>
  );
};

export default Match;
