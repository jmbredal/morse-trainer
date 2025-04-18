// Blinker.tsx
import { useEffect, useState } from "react";
import styles from "./Blinker.module.css";
import { playTone } from "./audioUtils";
import { MorseEntry } from "./morseCodes";

type Props = {
  code?: MorseEntry;
  onDone: () => void;
  disabled: boolean;
};

const UNIT = 300; // ms, base unit for Morse timing

export function Blinker({ code, onDone, disabled }: Props) {
  const [isOn, setIsOn] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [code]);

  useEffect(() => {
    console.log("blinker", code);

    if (!code || disabled) return;

    if (index >= code.sequence.length) {
      onDone();
      console.log("blinker done");
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
  }, [index, code, onDone, disabled]);

  return (
    <div className={styles.container}>
      <div className={`${styles.light} ${isOn ? styles.on : ""}`} />
    </div>
  );
}
