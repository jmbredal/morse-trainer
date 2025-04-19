import { useEffect, useState } from "react";
import styles from "./Blinker.module.css";
import { playTone } from "./audioUtils";

type Props = {
  symbol?: string;
  onDone: () => void;
  blink: boolean;
};

const UNIT = 100;

export function Blinker({ symbol, onDone, blink }: Props) {
  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    if (!symbol || !blink) return;

    const isDash = symbol === "-";
    const onTime = isDash ? UNIT * 3 : UNIT;

    setIsOn(true);
    playTone(onTime);

    const timer = setTimeout(() => {
      setIsOn(false);
      onDone();
    }, onTime);

    return () => clearTimeout(timer);
  }, [symbol, onDone, blink]);

  if (!symbol) {
    return;
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.light} ${isOn ? styles.on : ""}`} />
    </div>
  );
}
