import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";

import { useInterval } from "../hooks/use-interval.hook";
import { useAnimationFrame } from "../hooks/use-animation-frame.hook";

interface SpriteSheet {
  path: string;
  width: number;
  height: number;
  nFrames: number;
}

interface AnimatorProps {
  spriteSheet: SpriteSheet;
  startFrame: number;
  endFrame: number;
  fps: number;
  loop?: boolean;
}

export const Animator = ({
  spriteSheet,
  startFrame,
  endFrame,
  fps,
  loop = true,
}: AnimatorProps) => {
  const [currentFrame, setCurrentFrame] = useState(0);

  const nFrames = useMemo(() => endFrame - startFrame, [endFrame, startFrame]);

  const handleTick = useCallback(() => {
    setCurrentFrame(currentFrame => (currentFrame + 1) % nFrames);
  }, [nFrames]);

  const shouldAnimate = useMemo(
    () => startFrame + currentFrame + 1 < endFrame || loop,
    [currentFrame, startFrame, endFrame, loop]
  );

  useAnimationFrame(handleTick, { fps, shouldAnimate });

  const frameWidth = useMemo(
    () => spriteSheet.width / spriteSheet.nFrames,
    [spriteSheet.width, spriteSheet.nFrames]
  );

  const columnOffset = useMemo(
    () => frameWidth * (startFrame + currentFrame),
    [frameWidth, startFrame, currentFrame]
  );

  return (
    <div
      style={{
        marginTop: "4rem",
        width: frameWidth,
        overflow: "hidden",
      }}
    >
      <Image
        unoptimized
        layout="fixed"
        width={spriteSheet.width}
        height={spriteSheet.height}
        src={spriteSheet.path}
        alt="Animation"
        style={{
          transform: `translate(-${columnOffset}px, 15px)`,
        }}
      />
    </div>
  );
};
