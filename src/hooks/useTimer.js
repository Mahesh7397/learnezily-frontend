import { useEffect, useState } from "react";

export default function useTimer(initial = 900) {
  const [time, setTime] = useState(initial);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setTime((t) => (t > 0 ? t - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [running]);

  return { time, running, setRunning };
}
