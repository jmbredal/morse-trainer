// BlinkChar.tsx
import { useState } from "react";
import styles from "./Blinker.module.css";
import { BlinkSymbol } from "./BlinkSymbol";
import { morseList } from "./morseCodes";

type Props = {
  char: string;
  onDone: () => void;
};

const UNIT = 100;
const PAUSE_BETWEEN_SYMBOLS = UNIT;

export function BlinkChar({ char, onDone }: Props) {
  const [symbolIndex, setSymbolIndex] = useState(0);
  const entry = morseList.find((e) => e.char === char.toUpperCase());

  console.log("Blinking the character", char);

  if (!entry) return null;

  const symbol = entry.sequence[symbolIndex];

  function handleSymbolDone() {
    const next = symbolIndex + 1;

    if (next < entry.sequence.length) {
      setTimeout(() => setSymbolIndex(next), PAUSE_BETWEEN_SYMBOLS);
    } else {
      setTimeout(() => onDone(), 0); // no pause here; handled by Telegraph
    }
  }

  return (
    <div className={styles.container}>
      <BlinkSymbol
        key={symbolIndex}
        symbol={symbol}
        onDone={handleSymbolDone}
      />
    </div>
  );
}
