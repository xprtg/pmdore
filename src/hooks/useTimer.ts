import { useState, useEffect } from 'react';

const useTimer = (initialTime: number) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const start = () => {
    setIsRunning(true);
    setStatus("running");
  };

  const pause = () => {
    setIsRunning(false);
    setStatus("paused");
  };

  const reset = () => {
    setIsRunning(false);
    setTimeLeft(initialTime);
    setStatus("idle");
  };

  const background = {
    idle: "bg-white",
    running: "bg-green-200",
    paused: "bg-red-200",
  }[status];

  return { timeLeft, isRunning, background, start, pause, reset };
};

export default useTimer;
