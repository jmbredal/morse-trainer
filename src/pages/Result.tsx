import type { MorseEntry } from "../data/morseCodes";
import styles from "./Result.module.css";

type Props = {
  morseEntry: MorseEntry;
  guess: string;
};

export default function Result({ morseEntry, guess }: Props) {
  const isCorrect = morseEntry.char === guess;

  return (
    <div className={styles.resultContainer}>
      {isCorrect ? (
        <p className={styles.correct}>{guess} is correct! 🎉</p>
      ) : (
        <p className={styles.inCorrect}>Correct answer is {morseEntry.char}</p>
      )}
    </div>
  );
}
