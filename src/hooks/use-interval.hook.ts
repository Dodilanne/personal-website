import { useEffect } from "react";

export const useInterval = (
  callback: () => void,
  interval: number = 1000,
  args: any[] = []
) => {
  useEffect(() => {
    const int = setInterval(callback, interval);
    return () => clearInterval(int);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, args);
};
