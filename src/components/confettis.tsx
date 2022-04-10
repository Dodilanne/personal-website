import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Generator from "react-dom-confetti";

const config = {
  angle: 90,
  spread: 180,
  startVelocity: 20,
  elementCount: 100,
  dragFriction: 0.05,
  duration: 12000,
  stagger: 2,
  width: "10px",
  height: "10px",
  perspective: "1000px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
};

export const Confettis = ({ trigger }: { trigger: boolean }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setActive(prev => !prev), 2000);

    return () => clearInterval(timer);
  });

  return <Generator active={trigger} config={config} />;
};
