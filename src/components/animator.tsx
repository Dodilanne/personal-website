import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

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
  isUp: boolean;
  loop?: boolean;
  onEnd?(): void;
}

export const Animator = ({
  spriteSheet,
  startFrame,
  endFrame,
  fps,
  isUp,
  loop = true,
  onEnd,
}: AnimatorProps) => {
  const [currentFrame, setCurrentFrame] = useState(0);

  const nFrames = useMemo(() => endFrame - startFrame, [endFrame, startFrame]);

  useEffect(() => {
    if (!loop && currentFrame + 1 === endFrame && onEnd) {
      onEnd();
    }
  }, [currentFrame, endFrame, onEnd, loop]);

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
        position: "relative",
        marginTop: "4rem",
        width: frameWidth,
        overflow: "hidden",
        borderRadius: "50%",
        padding: "1rem",
        boxSizing: "content-box",
      }}
    >
      {!isUp && (
        <motion.div
          initial={false}
          layoutId="background"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            borderRadius: "50%",
            background: "#f99f38",
          }}
          transition={{ type: "spring", duration: 0.75, bounce: 0.25 }}
        />
      )}
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
