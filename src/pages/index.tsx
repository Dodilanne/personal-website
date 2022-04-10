import { useMemo, useState } from "react";
import clsx from "clsx";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";

import styles from "../styles/Home.module.css";
import { Animator } from "../components/animator";
import { DogState } from "../types/common";

const spring = {
  type: "spring",
  stiffness: 500,
  damping: 30,
  duration: 8000,
};

const Home: NextPage = () => {
  const [dogState, setDogState] = useState<DogState>("up");

  const isUp = useMemo(() => dogState === "up", [dogState]);
  const isTransitioning = useMemo(
    () => dogState === "transitioning",
    [dogState]
  );
  const isSitting = useMemo(() => dogState === "sitting", [dogState]);

  const handleSit = () => {
    if (dogState === "up") {
      setDogState("transitioning");
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Dodilanne</title>
      </Head>
      <AnimateSharedLayout>
        <main className={styles.main}>
          <AnimatePresence onExitComplete={() => setDogState("sitting")}>
            {isUp && (
              <motion.div layoutId="background" className={styles.background} />
            )}
          </AnimatePresence>
          <div className={styles.content}>
            <h1 className={styles.title}>
              Bienvenue sur mon{" "}
              <div
                className={clsx(styles.sitButton, !isUp && styles.disabled)}
                onClick={handleSit}
              >
                sit
              </div>
              e web
            </h1>
            <Animator
              isUp={isUp}
              startFrame={0}
              endFrame={isSitting ? 12 : 3}
              fps={isSitting ? 12 : 4}
              loop={!isSitting}
              spriteSheet={{
                path: "/spritesheet.png",
                width: 17088 / 6,
                height: 1442 / 6,
                nFrames: 12,
              }}
            />
          </div>
        </main>
      </AnimateSharedLayout>
      <footer className={styles.footer}>
        <a
          href="https://github.com/Dodilanne"
          target="_blank"
          rel="noopener noreferrer"
        >
          Dodi{" "}
          <span className={styles.logo}>
            <Image src="/favicon.ico" alt="Jack" width={26} height={26} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
