import { useEffect, useState } from 'react';

const useDecrementTimer = (lk: number) => {
  const [count, setCount] = useState(lk);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isRunning) {
      interval = setInterval(() => {
        setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (count === 0) {
      setIsRunning((i) => !i);
      setCount(lk);
    }
  }, [count, lk]);

  const timer = ![0, lk].includes(count) && count;
  return {
    timer,
    isRunning,
    setIsRunning,
  };
};

export { useDecrementTimer };
