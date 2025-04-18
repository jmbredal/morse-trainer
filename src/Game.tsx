import { useState } from "react";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
import { Blinker } from "./Blinker";
import Button from "./Button";
import Choices from "./Choices";
import styles from "./Game.module.css";
import { MorseEntry, morseList } from "./morseCodes";
import Result from "./Result";

export default function Game() {
  const [current, setCurrent] = useState<MorseEntry>();
  const [guessing, setGuessing] = useState(false);
  const [userGuess, setUserGuess] = useState<string | null>(null);
  const [confetti, setConfetti] = useState(false);

  function reset() {
    setGuessing(false);
    setUserGuess(null);
    setConfetti(false);
  }

  function play() {
    reset();

    // const index = Math.floor(Math.random() * morseList.length);
    const index = 1;
    console.log(morseList[index].char);
    setCurrent({ ...morseList[index] });
  }

  function onBlinkerDone() {
    setGuessing(true);
  }

  function handleGuess(guess: string) {
    setUserGuess(guess);

    if (guess === current?.char) {
      setConfetti(true);
    }
  }

  return (
    <section className={styles.gameContainer}>
      <Button onClick={play}>Play a code</Button>

      {current && <Blinker code={current} onDone={onBlinkerDone} />}

      {current && guessing && (
        <Choices correct={current} handleGuess={handleGuess} />
      )}
      {current && userGuess && (
        <Result morseEntry={current} guess={userGuess} />
      )}
      {confetti && <Fireworks autorun={{ speed: 3, duration: 1 }} />}
    </section>
  );
}
