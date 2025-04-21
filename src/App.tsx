import styles from "./App.module.css";
import Game from "./pages/Game";

function App() {
  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <h1>Morse Code Practice</h1>
      </header>

      <main className={styles.appMain}>
        <Game />
      </main>
    </div>
  );
}

export default App;
