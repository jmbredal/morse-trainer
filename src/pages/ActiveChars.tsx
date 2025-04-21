import { morseList } from "../data/morseCodes";
import styles from "./ActiveChars.module.css";

type Props = {
  selected: number[];
};

export default function ActiveChars({ selected }: Props) {
  return (
    <div className={styles.container}>
      {morseList
        .filter((e) => selected.includes(e.sequence.length))
        .sort((a, b) => a.char.localeCompare(b.char, "no"))
        .map((e) => (
          <span key={e.char}>{e.char}</span>
        ))}
    </div>
  );
}
