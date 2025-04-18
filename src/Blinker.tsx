// Blinker.tsx
import { useEffect, useState } from "react";
import styles from "./Blinker.module.css";
import { playTone } from "./audioUtils";
import { MorseEntry } from "./morseCodes";

type Props = {
  code?: MorseEntry;
  onDone: () => void;
};

const UNIT = 300; // ms, base unit for Morse timing

export function Blinker({ code, onDone }: Props) {
  const [isOn, setIsOn] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [code]);

  useEffect(() => {
    if (!code) return;

    if (index >= code.sequence.length) {
      onDone();
      return;
    }

    const symbol = code.sequence[index];
    const isDash = symbol === "-";

    setIsOn(true);
    const onTime = isDash ? UNIT * 3 : UNIT;
    const offTime = UNIT;
    playTone(onTime);

    const timer = setTimeout(() => {
      setIsOn(false);

      setTimeout(() => {
        setIndex((i) => i + 1);
      }, offTime);
    }, onTime);

    return () => clearTimeout(timer);
  }, [index, code, onDone]);

  return (
    <div className={styles.container}>
      <div className={`${styles.light} ${isOn ? styles.on : ""}`} />
    </div>
  );
}
