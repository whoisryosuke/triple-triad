import React, { useEffect, useRef, useState } from "react";
import { useGameStore } from "../../../../store/game";
import { MATCH_LENGTH_TIME } from "../../../../constants/game";

type Props = {};

const CountdownClock = (props: Props) => {
  const { startTime, mode, setMode } = useGameStore();
  const [currentTime, setCurrentTime] = useState(0);
  const prevStartTime = useRef<number>(0);
  const prevTime = useRef<number>(0);
  const requestRef = useRef<
    ReturnType<typeof requestAnimationFrame> | undefined
  >();

  const animate = (time: number) => {
    const { mode } = useGameStore.getState();
    // Repeat
    if (mode === "MATCH") requestRef.current = requestAnimationFrame(animate);

    // Set time. We use time value from RAF.
    const deltaTime = time - prevTime.current;
    setCurrentTime((state) => state + deltaTime * 0.01);
    prevTime.current = time;
  };

  // Start the clock (unless it's game over screen)
  useEffect(() => {
    if (mode === "MATCH") requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // Trigger "Game Over" screen when time has run out
  useEffect(() => {
    if (currentTime > MATCH_LENGTH_TIME) {
      setMode("GAME-OVER");
      console.log("game over");
    }
  }, [currentTime]);

  // Reset the clock if new game
  useEffect(() => {
    if (startTime !== prevStartTime.current) {
      prevStartTime.current = startTime;
      setCurrentTime(0);
    }
  }, [startTime]);

  const timeRemaining = MATCH_LENGTH_TIME - currentTime;
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = Math.floor(timeRemaining - minutes * 60);

  return (
    <div>
      <div>
        {minutes} : {seconds}
      </div>
    </div>
  );
};

export default CountdownClock;
