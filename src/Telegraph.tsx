// Telegraph.tsx
import { useState } from "react";
import { BlinkChar } from "./BlinkChar";
import styles from "./Blinker.module.css";

type Props = {
  text: string;
  onDone: () => void;
};

const UNIT = 100;
const PAUSE_BETWEEN_CHARS = UNIT * 2; // Already 1 unit after symbol

export function Telegraph({ text, onDone }: Props) {
  const [charIndex, setCharIndex] = useState(0);
  const chars = text.toUpperCase().split("");
  const currentChar = chars[charIndex];

  console.log("Telegraphing", text);

  function handleCharDone() {
    const next = charIndex + 1;

    if (next < chars.length) {
      const isWordPause = chars[charIndex] === " ";
      const delay = isWordPause ? UNIT * 7 : PAUSE_BETWEEN_CHARS;

      setTimeout(() => setCharIndex(next), delay);
    } else {
      onDone();
    }
  }

  return (
    <div className={styles.container}>
      {currentChar && currentChar !== " " && (
        <BlinkChar key={charIndex} char={currentChar} onDone={handleCharDone} />
      )}
    </div>
  );
}
