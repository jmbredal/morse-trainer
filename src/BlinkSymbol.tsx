import { useEffect, useState } from "react";
import styles from "./Blinker.module.css";
import { playTone } from "./audioUtils";

type Props = {
  symbol?: string;
  onDone: () => void;
};

const UNIT = 100;

export function BlinkSymbol({ symbol, onDone }: Props) {
  const [isOn, setIsOn] = useState(false);

  console.log("Blinking the symbol", symbol);

  useEffect(() => {
    if (!symbol) return;
    const isDash = symbol === "-";
    const onTime = isDash ? UNIT * 3 : UNIT;

    setIsOn(true);
    playTone(onTime);

    const timer = setTimeout(() => {
      setIsOn(false);
      onDone();
    }, onTime);

    return () => clearTimeout(timer);
  }, [symbol, onDone]);

  if (!symbol) {
    return;
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.light} ${isOn ? styles.on : ""}`} />
    </div>
  );
}
