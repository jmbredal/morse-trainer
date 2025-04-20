import { useEffect, useState } from "react";
import styles from "./Telegraph.module.css";
import { getMorseEntry } from "./utils";
import { Blinker } from "./Blinker";

type Props = {
  text: string;
  onDone: () => void;
};

export const UNIT = 100;
const PAUSE_BETWEEN_CHARS = UNIT * 3;

export function Telegraph({ text, onDone }: Props) {
  const [charIndex, setCharIndex] = useState(0);
  const [symbolIndex, setSymbolIndex] = useState(0);
  const [blink, setBlink] = useState(false);

  const chars = text.toUpperCase().split("");
  const sequences = chars
    .map((c) => getMorseEntry(c)!)
    .map((e) => e.sequence.split(""));

  const symbolsBlinked = sequences
    .slice(0, charIndex + 1)
    .map((l, i) => (i === charIndex ? l.slice(0, symbolIndex + 1) : l));

  useEffect(() => {
    // Turn blinking on when we have text to traverse
    if (!text) return;
    setBlink(true);

    // turn blinking off when component unmounts
    return () => {
      setBlink(false);
    };
  }, [text, symbolIndex]);

  function handleSymbolDone() {
    const nextIndex = symbolIndex + 1;
    const nextCharIndex = charIndex + 1;

    if (nextIndex < sequences[charIndex].length) {
      // Increase index for traversing the symbols for a character
      setTimeout(() => setSymbolIndex(nextIndex), UNIT);
    } else if (nextCharIndex < sequences.length) {
      // If we are done traversing the symbols for the current char, start on next char
      setTimeout(() => {
        setCharIndex(nextCharIndex);
        setSymbolIndex(0);
      }, PAUSE_BETWEEN_CHARS);
    } else {
      // We have traversed all symbols for all chars, close the blinker and call callback
      setBlink(false);
      onDone();
    }
  }

  return (
    <div className={styles.container}>
      <Blinker
        key={symbolIndex}
        blink={blink}
        symbol={sequences[charIndex][symbolIndex]}
        onDone={handleSymbolDone}
      />

      <div className={styles.symbolList}>
        {symbolsBlinked.map((symbolList, i) => (
          <span key={i}>
            {symbolList.map((symbol, i) => (
              <span key={i} className={styles.symbol}>
                {symbol}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
