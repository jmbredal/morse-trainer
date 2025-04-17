import { useState } from "react";
import styles from "./Game.module.css";
import { morseList } from "./morseCodes";
import { Blinker } from "./Blinker";

export default function Game() {
  const [showBlinker, setShowBlinker] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [userGuess, setUserGuess] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const [current, setCurrent] = useState(() => morseList[0]);

  // Pick a random Morse code entry from the list
  const play = () => {
    const randomMorse = morseList[Math.floor(Math.random() * morseList.length)];
    setCurrent(randomMorse);
    setShowBlinker(true);
    setIsCorrect(null); // Reset correctness for next round
    setUserGuess(null); // Reset guess
    setOptions(generateOptions(randomMorse));
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
    setIsCorrect(guess === current.char);
  };

  return (
    <>
      <button className={styles.morseButton} onClick={play}>
        Play Morse Code
      </button>

      {showBlinker && (
        <Blinker code={current.code} onDone={() => setShowBlinker(false)} />
      )}

      {!showBlinker && (
        <div>
          <p>Guess the character!</p>
          <div>
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
    </>
  );
}
