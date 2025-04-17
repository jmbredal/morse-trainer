import { useState } from "react";
import styles from "./App.module.css";
import Blinker from "./Blinker";
import { morseList } from "./morseCodes";

export default function App() {
  const [current, setCurrent] = useState(() => morseList[0]);
  const [showBlinker, setShowBlinker] = useState(false);

  const play = () => {
    const random = morseList[Math.floor(Math.random() * morseList.length)];
    console.log("displaying", random.char);
    setCurrent(random);
    setShowBlinker(true);
  };
  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <h1>Morse Code Practice</h1>
      </header>

      <main>
        <button className={styles.morseButton} onClick={play}>
          Play Morse Code
        </button>

        {showBlinker ? (
          <Blinker code={current.code} onDone={() => setShowBlinker(false)} />
        ) : (
          <p>Guess the character!</p>
        )}
      </main>
    </div>
  );
}
