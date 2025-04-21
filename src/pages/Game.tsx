import { useCallback, useEffect, useState } from "react";
import Button from "../components/Button";
import { MorseEntry } from "../data/morseCodes";
import { generateChoices, getRandomMorseEntry } from "../utils/utils";
import ActiveChars from "./ActiveChars";
import Choices from "./Choices";
import Filters from "./Filters";
import styles from "./Game.module.css";
import Result from "./Result";
import { Telegraph } from "./Telegraph";

export default function Game() {
  const [current, setCurrent] = useState<MorseEntry>();
  const [guessing, setGuessing] = useState(false);
  const [userGuess, setUserGuess] = useState<string | null>(null);
  const [correct, setCorrect] = useState(false);
  const [counter, setCounter] = useState(0);
  const [choices, setChoices] = useState<MorseEntry[]>([]);
  const [selected, setSelected] = useState([1, 2, 3]);

  useEffect(() => {
    if (!correct) return;
    setTimeout(() => setCorrect(false), 1500);
  }, [correct]);

  function reset() {
    setGuessing(false);
    setUserGuess(null);
    setUserGuess(null);
  }

  function play() {
    reset();

    const entry = getRandomMorseEntry(selected);
    setCurrent(entry);
    setCounter((prev) => prev + 1);
    setChoices(generateChoices(entry, selected));
  }

  function onChange(event: React.FormEvent<HTMLFormElement>) {
    const checkbox = event.target as HTMLElement;
    const form = checkbox.closest("form")!;
    setSelected(new FormData(form).getAll("selection").map((s) => +s));
  }

  const onTelegraphDone = useCallback(() => {
    setGuessing(true);
  }, []);

  function handleGuess(guess: string) {
    setUserGuess(guess);
    setGuessing(false);

    if (guess === current?.char) {
      setCorrect(true);
      play();
    }
  }

  return (
    <section className={styles.gameContainer}>
      <p>Select number of symbols to train on</p>

      <Filters selected={selected} onChange={onChange} />
      <ActiveChars selected={selected} />

      <Button onClick={play} disabled={selected.length === 0}>
        Start
      </Button>

      {current && (
        <Telegraph key={counter} text={current.char} onDone={onTelegraphDone} />
      )}

      {current && guessing && (
        <Choices choices={choices} handleGuess={handleGuess} />
      )}

      {current && userGuess && (
        <Result morseEntry={current} guess={userGuess} />
      )}
      {correct && <p className={styles.correct}>👍</p>}
    </section>
  );
}
