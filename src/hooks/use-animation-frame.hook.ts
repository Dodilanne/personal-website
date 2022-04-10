import { useCallback, useEffect, useMemo, useRef } from "react";

interface Options {
  fps: number;
  shouldAnimate?: boolean;
}

export const useAnimationFrame = (
  callback: (dt: number) => void,
  { fps, shouldAnimate = true }: Options
) => {
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>(0);

  const interval = useMemo(() => 1000 / fps, [fps]);

  const animate = useCallback(
    (time: number) => {
      const dt = time - previousTimeRef.current;

      if (shouldAnimate && dt > interval) {
        callback(dt);
        previousTimeRef.current = time;
      }

      requestRef.current = requestAnimationFrame(animate);
    },
    [shouldAnimate, interval, callback]
  );

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, [animate]);
};
