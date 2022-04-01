import { useState } from "react";
import clsx from "clsx";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import styles from "../styles/Home.module.css";

type DogState = "up" | "sitting";

const Home: NextPage = () => {
  const [dogState, setDogState] = useState<DogState>("up");

  const handleSit = () => {
    if (dogState === "up") {
      setDogState("sitting");
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Dodilanne</title>
        <meta name="description" content="Développeur" />
        <link rel="icon" href="/favicon.ico" />
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
          e
        </h1>
        <h2 className={styles.dogState}>
          {dogState === "sitting" ? "assis" : "debout"}
        </h2>
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
