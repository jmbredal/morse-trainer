import Button from "./Button";
import styles from "./Choices.module.css";
import { MorseEntry } from "./morseCodes";
import { generateOptions } from "./utils";

type Props = {
  correct: MorseEntry;
  handleGuess: (option: string) => void;
};

export default function Choices({ correct, handleGuess }: Props) {
  const options = generateOptions(correct.char);

  return (
    <div className={styles.choices}>
      {options.map((option) => (
        <Button key={option} onClick={() => handleGuess(option)}>
          {option}
        </Button>
      ))}
    </div>
  );
}
