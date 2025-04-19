import { useCallback, useState } from "react";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
import Button from "./Button";
import Choices from "./Choices";
import styles from "./Game.module.css";
import { MorseEntry } from "./morseCodes";
import Result from "./Result";
import { Telegraph } from "./Telegraph";
import { generateChoices, getRandomMorseEntry } from "./utils";

export default function Game() {
  const [current, setCurrent] = useState<MorseEntry>();
  const [guessing, setGuessing] = useState(false);
  const [userGuess, setUserGuess] = useState<string | null>(null);
  const [confetti, setConfetti] = useState(false);
  const [counter, setCounter] = useState(0);
  const [choices, setChoices] = useState<MorseEntry[]>([]);

  function reset() {
    setGuessing(false);
    setUserGuess(null);
    setConfetti(false);
  }

  function play() {
    reset();

    const entry = getRandomMorseEntry();
    setCurrent(entry);
    setCounter((prev) => prev + 1);
    setChoices(generateChoices(entry));
  }

  const onTelegraphDone = useCallback(() => {
    setGuessing(true);
  }, []);

  function handleGuess(guess: string) {
    setUserGuess(guess);
    setGuessing(false);

    if (guess === current?.char) {
      setConfetti(true);
    }
  }

  return (
    <section className={styles.gameContainer}>
      <Button onClick={play}>Play a code</Button>

      {current && (
        <Telegraph key={counter} text={current.char} onDone={onTelegraphDone} />
      )}

      {current && guessing && (
        <Choices choices={choices} handleGuess={handleGuess} />
      )}

      {current && userGuess && (
        <Result morseEntry={current} guess={userGuess} />
      )}
      {confetti && <Fireworks autorun={{ speed: 3, duration: 1 }} />}
    </section>
  );
}
