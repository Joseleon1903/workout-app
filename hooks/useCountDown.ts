import { useEffect, useRef, useState } from "react";

export function useCountDown(idx: number, initialCount: number = -1) {
  const [countDown, setCountDown] = useState(initialCount);
  const intervalReference = useRef<number>();
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (idx == -1) {
      return;
    }

    if (isRunning && !intervalReference.current) {
      intervalReference.current = window.setInterval(() => {
        setCountDown((count) => {
          console.log(count);
          return count - 1;
        });
      }, 1000);
    }
    console.log("Tracker has been changed!");
    return cleanUp;
  }, [idx]);

  useEffect(() => {
    setCountDown(initialCount);
  }, [initialCount]);

  useEffect(() => {
    if (countDown == 0) {
      cleanUp();
    }
  }, [countDown]);

  const cleanUp = () => {
    console.log("CLEANUP!!");
    if (intervalReference.current) {
      setIsRunning(false);
      window.clearInterval(intervalReference.current);
      intervalReference.current = undefined;
    }
  };

  return {
    countDown,
    isRunning,
    stop: cleanUp,
    start: (count?: number) => {
      console.log("press start.");
      setCountDown(count ?? initialCount);
      setIsRunning(true);
    },
  };
}
