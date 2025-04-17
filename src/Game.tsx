import { useState } from "react";
import styles from "./Game.module.css";
import { morseList } from "./morseCodes";
import { Blinker } from "./Blinker";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
import clsx from "clsx";

export default function Game() {
  const [current, setCurrent] = useState(() => morseList[0]);
  const [showBlinker, setShowBlinker] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [userGuess, setUserGuess] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [confetti, setConfetti] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  const isAnswering = hasPlayed && !showBlinker;

  // Pick a random Morse code entry from the list
  const play = () => {
    const randomMorse = morseList[Math.floor(Math.random() * morseList.length)];
    console.log(randomMorse.char);

    setHasPlayed(true);
    setCurrent(randomMorse);
    setShowBlinker(true);
    setIsCorrect(null); // Reset correctness for next round
    setUserGuess(null); // Reset guess
    setOptions(generateOptions(randomMorse));
    setConfetti(false); // Reset confetti before next round
  };

  // Generate three options, with one correct answer
  const generateOptions = (correct: { char: string }) => {
    const randomOptions = new Set<string>();
    randomOptions.add(correct.char);

    while (randomOptions.size < 3) {
      const randomOption =
        morseList[Math.floor(Math.random() * morseList.length)].char;
      randomOptions.add(randomOption);
    }

    return [...randomOptions];
  };

  // Handle the user's guess
  const handleGuess = (guess: string) => {
    setUserGuess(guess);
    setHasPlayed(true);
    const correct = guess === current.char;
    setIsCorrect(correct);

    if (correct) {
      setConfetti(true); // Show confetti on correct answer
      setTimeout(() => {
        setHasPlayed(false);
      }, 3000);
    }
  };

  return (
    <>
      <button
        className={clsx(styles.morseButton, hasPlayed && styles.hidden)}
        onClick={play}
      >
        Play Morse Code
      </button>

      {showBlinker && (
        <Blinker code={current.code} onDone={() => setShowBlinker(false)} />
      )}

      {isAnswering && (
        <div>
          <p>Guess the character!</p>

          <div className={styles.choices}>
            {options.map((option) => (
              <button
                key={option}
                className={styles.morseButton}
                onClick={() => handleGuess(option)}
              >
                {option}
              </button>
            ))}
          </div>

          {userGuess && (
            <div>
              {isCorrect ? (
                <p style={{ color: "green" }}>{current.char} is correct! 🎉</p>
              ) : (
                <>
                  <p style={{ color: "red" }}>{userGuess} is not correct!</p>
                  <p style={{ color: "red" }}>
                    The sequence <code>{current.code}</code> represents{" "}
                    {current.char}
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {confetti && <Fireworks autorun={{ speed: 3, duration: 1 }} />}
    </>
  );
}
