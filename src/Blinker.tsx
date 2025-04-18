// Blinker.tsx
import { useEffect, useState } from "react";
import styles from "./Blinker.module.css";
import { playTone } from "./audioUtils";
import { MorseEntry } from "./morseCodes";

type Props = {
  code: MorseEntry;
  onDone: () => void;
};

const UNIT = 100; // ms, base unit for Morse timing

export function Blinker({ code, onDone }: Props) {
  const [isOn, setIsOn] = useState(false);
  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState(code);

  if (prev !== code) {
    setIndex(0);
    setPrev(code);
  }

  useEffect(() => {
    if (index >= code.sequence.length) {
      console.log("setting ready to false");
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

  const sequence = code.sequence
    .split("")
    .slice(0, index + 1)
    .map((s, index) => <span key={index}>{s}</span>);

  return (
    <div className={styles.container}>
      <div className={`${styles.light} ${isOn ? styles.on : ""}`} />
      <p className={styles.sequence}>{sequence}</p>
    </div>
  );
}
