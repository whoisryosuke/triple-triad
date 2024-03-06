import React, { useEffect, useRef, useState } from "react";
import { useGameStore } from "../../../../store/game";
import { MATCH_LENGTH_TIME } from "../../../../constants/game";

type Props = {};

const CountdownClock = (props: Props) => {
  const { startTime, mode, setMode } = useGameStore();
  const [currentTime, setCurrentTime] = useState(0);
  const prevStartTime = useRef<number>(0);
  const prevTime = useRef<number>(0);
  const isPlaying = useRef(false);
  const requestRef = useRef<
    ReturnType<typeof requestAnimationFrame> | undefined
  >();

  // console.log("[CLOCK] currentTime", currentTime);

  const animate = (time: number) => {
    // No previous time? Assume it's the current time.
    // When we reset game, the RAF time keeps going, so zeroing breaks time
    if (prevTime.current === 0) prevTime.current = time;

    // Get the latest state (since the callback restricts reaching out)
    const { mode } = useGameStore.getState();
    // Repeat
    if (mode === "MATCH" && isPlaying.current)
      requestRef.current = requestAnimationFrame(animate);

    // Set time. We use time value from RAF.
    const deltaTime = time - prevTime.current;
    setCurrentTime((state) => state + deltaTime * 0.01);
    prevTime.current = time;
  };

  // Start the clock (unless it's game over screen)
  useEffect(() => {
    if (mode === "MATCH" && isPlaying.current)
      requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // Trigger "Game Over" screen when time has run out
  useEffect(() => {
    if (currentTime > MATCH_LENGTH_TIME && isPlaying.current) {
      setMode("GAME-OVER");
      console.log("[CLOCK] Game over - time ran out", currentTime);
      isPlaying.current = false;
    }
  }, [currentTime]);

  // Reset the clock if new game
  useEffect(() => {
    if (startTime !== prevStartTime.current && !isPlaying.current) {
      console.log("[CLOCK] Resetting clock");
      prevStartTime.current = startTime;
      setCurrentTime(0);
      isPlaying.current = true;
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
