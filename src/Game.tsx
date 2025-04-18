import { useCallback, useState } from "react";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
import { Blinker } from "./Blinker";
import Button from "./Button";
import Choices from "./Choices";
import styles from "./Game.module.css";
import { MorseEntry, morseList } from "./morseCodes";
import Result from "./Result";
import { generateChoices } from "./utils";

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

    const index = Math.floor(Math.random() * morseList.length);
    const entry = { ...morseList[index] };
    console.log(entry.char);
    setCurrent(entry);
    setChoices(generateChoices(entry));
    setCounter((prev) => prev + 1);
  }

  const onBlinkerDone = useCallback(() => {
    console.log("onBlinkerDone");
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
        <Blinker key={counter} code={current} onDone={onBlinkerDone} />
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
