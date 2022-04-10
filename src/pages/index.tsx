import { useMemo, useState } from "react";
import clsx from "clsx";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import styles from "../styles/Home.module.css";
import { Animator } from "../components/animator";
import { DogState } from "../types/common";

const Home: NextPage = () => {
  const [dogState, setDogState] = useState<DogState>("up");

  const isUp = useMemo(() => dogState === "up", [dogState]);

  const handleSit = () => {
    if (dogState === "up") {
      setDogState("sitting");
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Dodilanne</title>
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Bienvenue sur mon{" "}
          <div
            className={clsx(
              styles.sitButton,
              dogState === "sitting" && styles.disabled
            )}
            onClick={handleSit}
          >
            sit
          </div>
          e web
        </h1>
        <Animator
          startFrame={0}
          endFrame={isUp ? 3 : 12}
          fps={isUp ? 4 : 12}
          loop={isUp}
          spriteSheet={{
            path: "/spritesheet.png",
            width: 17088 / 6,
            height: 1442 / 6,
            nFrames: 12,
          }}
        />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/Dodilanne"
          target="_blank"
          rel="noopener noreferrer"
        >
          Propulsé par Dodi{" "}
          <span className={styles.logo}>
            <Image src="/favicon.ico" alt="Jack" width={26} height={26} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
