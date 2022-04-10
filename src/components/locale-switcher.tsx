import Image from "next/image";
import { useRouter } from "next/router";
import { useMemo } from "react";

export const LocaleSwitcher = () => {
  const router = useRouter();

  const nextLocale = useMemo(
    () => (router.locale === "fr" ? "en" : "fr"),
    [router.locale]
  );

  const switchLocale = () => {
    const { pathname, asPath, query, locale } = router;
    router.push({ pathname, query }, asPath, {
      locale: nextLocale,
    });
  };

  return (
    <div
      style={{
        color: "black",
        position: "absolute",
        zIndex: 1,
        top: 0,
        right: 0,
        padding: "1rem",
        display: "flex",
        alignItems: "center",
      }}
    >
      <p
        style={{
          margin: "0.3rem 1rem 0 0",
          fontSize: "1.5rem",
          cursor: "pointer",
        }}
        onClick={switchLocale}
      >
        {nextLocale}
      </p>
      <Image src="/globe.png" width={18} height={18} alt="globe" />
    </div>
  );
};
