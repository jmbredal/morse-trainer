import Button from "../components/Button";
import styles from "./Choices.module.css";
import { MorseEntry } from "../data/morseCodes";

type Props = {
  choices: MorseEntry[];
  handleGuess: (option: string) => void;
};

export default function Choices({ choices, handleGuess }: Props) {
  return (
    <div className={styles.choices}>
      {choices.map((choice) => (
        <Button key={choice.char} onClick={() => handleGuess(choice.char)}>
          {choice.char}
        </Button>
      ))}
    </div>
  );
}
