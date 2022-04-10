import { useMemo, useState } from "react";
import clsx from "clsx";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";

import styles from "../styles/Home.module.css";
import { Animator } from "../components/animator";
import { DogState } from "../types/common";
import { Confettis } from "../components/confettis";
import { useRouter } from "next/router";
import { LocaleSwitcher } from "../components/locale-switcher";

const Home: NextPage = () => {
  const router = useRouter();
  const [dogState, setDogState] = useState<DogState>("up");
  const [triggerConfettis, setTriggerConfettis] = useState(false);

  const isUp = useMemo(() => dogState === "up", [dogState]);
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
          <LocaleSwitcher />
          <AnimatePresence onExitComplete={() => setDogState("sitting")}>
            {isUp && (
              <motion.div layoutId="background" className={styles.background} />
            )}
          </AnimatePresence>
          <div className={styles.content}>
            {router.locale === "fr" ? (
              <h1 className={styles.title}>
                Bienvenue sur mon{" "}
                <div
                  className={clsx(styles.sitButton, !isUp && styles.disabled)}
                  onClick={handleSit}
                >
                  sit
                </div>
                e
              </h1>
            ) : (
              <h1 className={styles.title}>
                Welcome to my web
                <div
                  className={clsx(styles.sitButton, !isUp && styles.disabled)}
                  onClick={handleSit}
                >
                  sit
                </div>
                e
              </h1>
            )}
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: "2rem",
                  bottom: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Confettis trigger={triggerConfettis} />
              </div>
              <Animator
                isUp={isUp}
                startFrame={0}
                endFrame={isSitting ? 12 : 3}
                fps={isSitting ? 12 : 4}
                loop={!isSitting}
                onEnd={() => setTriggerConfettis(true)}
                spriteSheet={{
                  path: "/spritesheet.png",
                  width: 17088 / 6,
                  height: 1442 / 6,
                  nFrames: 12,
                }}
              />
            </div>
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
